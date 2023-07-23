import * as React from 'react';   // imports React library
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';   // imports MUI components


const ReviewRating = ({ selectedRating, handleRatingChange, errorMessage }) => {   // defines a function called 'ReviewRating', and accesses props

  return (
    <>
      <Typography variant="body1">Select the rating:</Typography>
      <FormControl>   {/* creates a 'FormControl' component, which serves as a wrapper for the 'RadioGroup' component */}
        <RadioGroup   // creates a 'RadioGroup' component, which represents a group of radio buttons
          value={selectedRating}   // creates a prop 'value', with the value of 'selectedRating'
          onChange={handleRatingChange}   // creates a prop 'onChange', that acts as a event handler when the value 'handleRatingChange' changes
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />   {/* creates a 'FormControlLabel' component, which represents that individual radio buttons, with a attributes giving the button values and labels */}
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
      </FormControl>
      {errorMessage.ratingError && <Typography variant="body2" color="red">{errorMessage.ratingError}</Typography>}   {/* conditional operator checks if 'errorMessage.ratingError' is truthy, if true, displays an error text */}
    </>
  );
}

export default ReviewRating;
