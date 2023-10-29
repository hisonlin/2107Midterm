import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Radio, FormControlLabel, RadioGroup } from '@mui/material';

const QuestionCard = ({ questionNumber, question, answers, userAnswers, updateUserAnswer}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(userAnswers || ''); // Initialize with the user's answer

    const handleAnswerChange = (event) => {
        const newAnswer = event.target.value;
        setSelectedAnswer(newAnswer);
        updateUserAnswer(newAnswer);
    };

    return (
        <Card sx={{
            width: '600px',
            height: '100%',
        }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" marginBottom={2} fontWeight="bold">
                    {questionNumber}/20
                </Typography>
                <Typography variant="h6" component="div" marginBottom={2} fontWeight="bold">
                    {question}
                </Typography>
                <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                    {Object.keys(answers).map((answerKey, index) => (
                        answers[answerKey] !== null ? (
                            <FormControlLabel
                                key={answerKey}
                                value={answerKey}
                                control={<Radio />}
                                label={
                                    <span style={{ color: selectedAnswer === answerKey ? 'blue' : 'black' }}>
                                        {answers[answerKey]}
                                    </span>
                                }
                            />
                        ) : null
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

QuestionCard.propTypes = {
    
};

export default QuestionCard;
