import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Radio, FormControlLabel, RadioGroup } from '@mui/material';

const QuestionCard = ({ questionNumber, question, answers }) => {
    return (
        <>
            <Card style={{
                height: "100%",
                width: "100%",
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        Question {questionNumber}
                    </Typography>
                    <Typography>Question: {question}</Typography>
                    <RadioGroup>
                        {Object.keys(answers).map((answerKey, index) => (
                            answers[answerKey] !== null ? (
                                <FormControlLabel
                                    key={answerKey}
                                    value={answerKey}
                                    control={<Radio />}
                                    label={answers[answerKey]}
                                />
                            ) : null
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>
        </>
    );
};

QuestionCard.propTypes = {
    questionNumber: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.object.isRequired,
};

export default QuestionCard;
