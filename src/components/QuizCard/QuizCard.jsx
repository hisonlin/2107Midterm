import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ category, difficulties }) => {
    const navigate = useNavigate();

    const navigateToQuiz = (selectedDifficulty) => {
        // Use the 'navigate' function with category and selectedDifficulty
        navigate(`/quiz/${category}/${selectedDifficulty}`);
    };

    return (
        <Card
            style={{
                height: "300px", // Set the height to a larger value
                width: "500px", // Set the width to a larger value
                margin: "16px", // Add some margin for spacing            
            }}
        >
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {category}
                </Typography>
                <Box display="flex" flexDirection="column" alignItems={"center"}>
                    {difficulties.map((diff, index) => {
                        return (
                            <Button
                                key={index}
                                variant="contained"
                                onClick={() => navigateToQuiz(diff)}
                                sx={{ mt: 2 ,width:"80%"}}
                                
                            >
                                {diff}
                            </Button>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};

QuizCard.propTypes = {
    category: PropTypes.string.isRequired,
    
    difficulties: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuizCard;
