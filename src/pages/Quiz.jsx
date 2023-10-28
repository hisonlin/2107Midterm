import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard/QuestionCard';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Quiz = (props) => {
    const URL = "https://quizapi.io/api/v1/questions?apiKey=";
    const APIKEY = "ZEQR3kef9uq5KHwBmeIWWYdpJySzNnHgUc0wPTn3";
    const { category, difficulty } = useParams();
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const getQuizData = async () => {
        const { data } = await axios.get(`${URL}${APIKEY}&category=${category}&difficulty=${difficulty}`);
        setQuizData(data);
    };

    useEffect(() => {
        getQuizData();
    }, []);

    const nextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
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
        <div>
            <Typography gutterBottom variant="h4" component="div">
                    {category} {difficulty}
                </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <IconButton onClick={prevQuestion}>
                    <ArrowBackIcon />
                </IconButton>
                
                <IconButton onClick={nextQuestion}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
            {quizData.length > 0 && (
                <QuestionCard
                    key={currentQuestionIndex}
                    questionNumber={currentQuestionIndex + 1}
                    category={quizData[currentQuestionIndex].category}
                    difficulty={quizData[currentQuestionIndex].difficulty}
                    question={quizData[currentQuestionIndex].question}
                    answers={quizData[currentQuestionIndex].answers}
                />
            )}
        </div>
    );
};

Quiz.propTypes = {};

export default Quiz;
