import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuizCard from '../components/QuizCard/QuizCard';
import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = (props) => {
    const categories = ["Linux", "Bash", "Docker", "CMS", "SQL", "Code", "DevOps", "Uncategorized"];
    const difficulties = ["Easy", "Medium", "Hard"];
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    const nextCategory = () => {
        setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const prevCategory = () => {
        setCurrentCategoryIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh" // Set the height to 100vh
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                <Typography variant="h2" component="div" fontWeight="bold">
                    Pick a Quiz!
                </Typography>
        
                <Box display="flex" alignItems="center">
                    <IconButton onClick={prevCategory}>
                        <ArrowBackIcon />
                    </IconButton>
                    <QuizCard category={categories[currentCategoryIndex]} difficulties={difficulties} />
                    <IconButton onClick={nextCategory}>
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

Home.propTypes = {};

export default Home;
