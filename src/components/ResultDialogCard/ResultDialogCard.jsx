import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography} from '@mui/material';


const ResultDialogCard = ({ wrongQuestionNumbers, wrongQuestions, correctAnswers }) => {
 
  return (
    <Card sx={{
      width: '600px',
      height: '100%',
  }}>
      <CardContent sx={{ textAlign: 'left' }}>
          <Typography gutterBottom variant="h6" component="div" marginBottom={2} fontWeight="bold">
              Question {wrongQuestionNumbers}
          </Typography>
          <Typography variant="h6" component="div" marginBottom={2} fontWeight="bold">
              {wrongQuestions}
          </Typography>
          <Typography variant="h8" component="div" marginBottom={2} color={"error"}>
            Correct Answer: {correctAnswers}
          </Typography>
      </CardContent>
  </Card>
  )
}

ResultDialogCard.propTypes = {

}

export default ResultDialogCard
