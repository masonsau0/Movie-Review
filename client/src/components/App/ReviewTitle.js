import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Typography, TextField } from '@mui/material';

const ReviewTitle = ({ enteredTitle, handleTitleChange, errorMessage }) => {

  return (
    <>
      <Typography variant="body1">Enter your review title:</Typography>
      <TextField
        label="Enter a review title"
        value={enteredTitle}
        onChange={handleTitleChange}
        fullWidth
      />
      {errorMessage.titleError && <Typography variant="body2" color="red">{errorMessage.titleError}</Typography>}
    </>
  );
}

export default ReviewTitle;