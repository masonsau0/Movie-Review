import * as React from 'react';   // imports the React library
import { Typography, TextField } from '@mui/material';   // imports MUI components

const ReviewBody = ({ enteredReview, handleReviewChange, errorMessage }) => {   // defines a function called 'ReviewBody', and accesses props 

  return (   // returns the following code as the output of the function 'ReviewBody'
    <>
      <Typography variant="body1">Enter your review:</Typography>   {/* creates a Typography component, with display text */}
      <TextField   // creates a TextField component, that displays a text input field 
        label="Enter your review"   // creates an attribute 'label' and assigns it the value 'Enter your review'
        value={enteredReview}    // creates a prop
        onChange={handleReviewChange}    // creates a prop
        multiline   // creates an attribute 'multiline', which specifies that the TextField should show as a multiline input field
        fullWidth   // creates an attribute 'fullWidth', which specifies that the TextField should take up the full width of its container
        maxRows={4}   // creates a prop 'maxRows' that sets the maximum number of rows visible in the multiline TextField
      />
      {errorMessage.reviewError && <Typography variant="body2" color="red">{errorMessage.reviewError}</Typography>}    {/* conditional operator checks if errorMessage.reviewError is truthy, if true, displays an text error message in red */}
    </>
  );
}



export default ReviewBody;