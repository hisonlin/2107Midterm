import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard/QuestionCard';
import { Box, CircularProgress, IconButton, Typography, Dialog, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Stack from '@mui/material/Stack';
import ResultDialogCard from '../components/ResultDialogCard/ResultDialogCard';

const Quiz = (props) => {
    const URL = "https://quizapi.io/api/v1/questions?apiKey=";
    const APIKEY = "ZEQR3kef9uq5KHwBmeIWWYdpJySzNnHgUc0wPTn3";
    const { category, difficulty } = useParams();
    const [quizData, setQuizData] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
    const [finalResult, setFinalResult] = useState(0);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [wrongQuestionNumbers, setWrongQuestionNumbers] = useState([]);
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const scrollContainerRef = useRef(null);

    const navgiate = useNavigate();

    const getQuizData = async () => {
        const cachedQuestions = localStorage.getItem('quizData');
        if (cachedQuestions) {
            setQuizData(JSON.parse(cachedQuestions));
        } else {
            const { data } = await axios.get(`${URL}${APIKEY}&category=${category}&difficulty=${difficulty}`);
            setQuizData(data);
            localStorage.setItem('quizData', JSON.stringify(data));
        }
    };

    useEffect(() => {
        getQuizData();
    }, []);

    const updateUserAnswer = (index, selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => {
            const newAnswers = [...prevUserAnswers];
            newAnswers[index] = selectedAnswer;
            return newAnswers;
        });
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const openResultDialog = () => {
        setIsResultDialogOpen(true);
    };

    const closeResultDialog = () => {
        setIsResultDialogOpen(false);
    };

    const openConfirmationDialog = () => {
        setConfirmationDialogOpen(true);
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
    };

    const handleSubmit = () => {
        localStorage.setItem('quizUserAnswers', JSON.stringify(userAnswers));
        openDialog();
    };

    const submit = () => {
        localStorage.setItem('quizUserAnswers', JSON.stringify(userAnswers));
        closeDialog();
        openConfirmationDialog();
    };

    const calculateFinalAnswers = () => {
        let marks = 0;

        for (let i = 0; i < userAnswers.length; i++) {
            const correctAnswers = quizData[i].correct_answers;
            const userAnswer = userAnswers[i];
    
            if (correctAnswers) {

                if (correctAnswers[`${userAnswer}_correct`] === "true") {
                    marks++;
                }
            }
        }

        return marks;
    };

    //find the wrong question number
    const findWrongQuestionNumber = () => {
        let wrongQuestionNumbers = [];
        for (let i = 0; i < userAnswers.length; i++) {
            const correctAnswers = quizData[i].correct_answers;
            const userAnswer = userAnswers[i];
            if (correctAnswers) {
                if (correctAnswers[`${userAnswer}_correct`] === "false") {
                    wrongQuestionNumbers.push(i + 1);
                }
            }
        }
        return wrongQuestionNumbers;
    }

    //find the wrong question
    const findWrongQuestion = () => {
        let wrongQuestions = [];
        for (let i = 0; i < userAnswers.length; i++) {
            const correctAnswers = quizData[i].correct_answers;
            const userAnswer = userAnswers[i];
            if (correctAnswers) {
                if (correctAnswers[`${userAnswer}_correct`] === "false") {
                    wrongQuestions.push(quizData[i].question);
                }
            }
        }
        return wrongQuestions;
    }

  const findCorrectAnswer = () => {
    let correctAnswersResult = [];

    for (let i = 0; i < userAnswers.length; i++) {
        const correctAnswersData = quizData[i].correct_answers;
        const userAnswer = userAnswers[i];
        if (correctAnswersData) {
            if (correctAnswersData[`${userAnswer}_correct`] === "false") {
                let foundCorrectAnswer = false; // Flag to check if a correct answer is found
                for (const key in correctAnswersData) {
                    if (correctAnswersData[key] === "true") {
                        correctAnswersResult.push(quizData[i].answers[key.replace('_correct', '')]);
                        foundCorrectAnswer = true;
                    }
                }
                // If no correct answer is found, push "Null"
                if (!foundCorrectAnswer) {
                    correctAnswersResult.push("Null");
                }
            }
        } else {
            correctAnswersResult.push("Null");
        }
    }
    return correctAnswersResult;
}

const handleSubmission = () => {
    const finalResult = calculateFinalAnswers();
    const wrongQuestionNumbers = findWrongQuestionNumber();
    const wrongQuestions = findWrongQuestion();
    const correctAnswers = findCorrectAnswer();
    
    setFinalResult(finalResult);
    setWrongQuestionNumbers(wrongQuestionNumbers);
    setWrongQuestions(wrongQuestions);
    setCorrectAnswers(correctAnswers);
    closeConfirmationDialog();
    openResultDialog();
};

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 600;
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 600;
        }
    };

    if (quizData.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress size={40} />
            </Box>
        );
    }

    return (
        <>
            <Button variant="contained" color="primary" onClick={()=>navgiate("/")}>Home</Button>           
        <div style={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
           
            <Typography gutterBottom variant="h3" component="div" fontWeight="bold">
                {category} - {difficulty}
            </Typography>

            <Stack direction="row" spacing={2}>
                <IconButton onClick={scrollLeft}>
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Box ref={scrollContainerRef} className="scrollable-container" >
                    <Box style={{
                        display: 'flex',
                    }}>
                        {quizData.map((question, index) => (
                            <QuestionCard
                                key={index}
                                questionNumber={index + 1}
                                category={question.category}
                                difficulty={question.difficulty}
                                question={question.question}
                                answers={question.answers}
                                userAnswers={userAnswers[index]}
                                updateUserAnswer={(selectedAnswer) => updateUserAnswer(index, selectedAnswer)}
                            />
                        ))}
                    </Box>
                </Box>
                <IconButton onClick={scrollRight}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Stack>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={userAnswers.length !== quizData.length}>
                Submit
            </Button>
            <Dialog open={isDialogOpen} onClose={closeDialog} PaperProps={{ style: { maxWidth: '800px' } }}>
                <Box p={2}>
                    {quizData.map((question, index) => (
                        <QuestionCard
                            key={index}
                            questionNumber={index + 1}
                            category={question.category}
                            difficulty={question.difficulty}
                            question={question.question}
                            answers={question.answers}
                            userAnswers={userAnswers[index]}
                            updateUserAnswer={(selectedAnswer) => updateUserAnswer(index, selectedAnswer)}
                            isDialogOpen={isDialogOpen}
                        />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={submit} sx={{ width: "30%", marginBottom: "10px" }}>Submit</Button>
                </Box>
            </Dialog>

            <Dialog open={confirmationDialogOpen} onClose={closeResultDialog} PaperProps={{ style: { maxWidth: '800px' } }}>
                <Box p={2} sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
                        Are you sure to submit?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Button variant="contained" color="primary" onClick={handleSubmission}>Yes</Button>
                        <Button variant="contained" color="primary" onClick={closeConfirmationDialog}>No</Button>
                    </Box>
                </Box>
            </Dialog>

            <Dialog open={isResultDialogOpen} onClose={closeResultDialog} PaperProps={{ style: { maxWidth: '800px' } }} sx={{ textAlign: 'center' }}>
                <Box p={2}>
                    <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
                        Your final score is {finalResult}/20
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                        Wrong Questions:
                    </Typography>
                    {wrongQuestionNumbers.map((wrongQuestionNumber, index) => (
                        <ResultDialogCard
                            key={index}
                            wrongQuestionNumbers={wrongQuestionNumber}
                            wrongQuestions={wrongQuestions[index]}
                            correctAnswers={correctAnswers[index]}
                        />
                    ))}
                    <Button variant="contained" color="primary" onClick={() => { closeResultDialog; navgiate("/") }}>Close</Button>
                </Box>
            </Dialog>

        </div>
        </>
    );
};

export default Quiz;
