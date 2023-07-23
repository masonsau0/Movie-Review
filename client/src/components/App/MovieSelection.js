import * as React from 'react';   // imports the React library 
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';   // imports MUI components

const MovieSelection = ({ movies, selectedMovie, handleMovieChange, errorMessage }) => {   // defines a function called 'MovieSelection', and accesses props (props in curly braces {})

  return (  // returns the following code as the output of the 'MovieSelection' function
    <>
      <Typography variant="body1">Select a movie:</Typography>
      <FormControl fullWidth>   {/* creates a FormControl component, 'fullWidth' sets it to occupy the full width of the container */}
        <InputLabel >Select a movie</InputLabel>   {/* creates a InputLabel component, that displays text */}
        <Select   // creates a Select component, 
          id="movie-select"   //creates an attribute called 'id' 
          value={selectedMovie}   // creates a prop called 'value' and sets it to the value of 'selectedMovie'
          onChange={handleMovieChange}   // creates a prop/event handler (both) called 'onChange' and assigns it to the value 'handleMovieChange' (acts as the event handler when the value of the 'Select' component changes)
        >
          {movies.map((movie, index) => (   // uses the map method to iterate over the 'movies' array 
            <MenuItem key={index} value={movie.name}>   {/* creates a 'MenuItem' component, with a prop 'key' assigned to 'index' of the current iteration, and a prop 'value' assigned to the value 'movie'. (associates the value of the 'MenuItem' with the selected value of the 'Select' component) */}
              {movie.name}   {/* represents the content of the 'MenuItem' component, which is the actual movie value (displayed as the text inside the menu item) */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorMessage.movieError && <Typography variant="body2" color="red">{errorMessage.movieError}</Typography>}   {/* renders the errorMessage if it is truthy (if there is an error) and displays the the error message in red text  */}
    </>
  );
}

export default MovieSelection;   // exports 'MovieSelection' function as the default export, allowing it to be imported to other parts of code