import React from 'react';
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import MovieSelection from '../App/MovieSelection';
import ReviewBody from '../App/ReviewBody';
import ReviewTitle from '../App/ReviewTitle';
import ReviewRating from '../App/ReviewRating';

const serverURL = "";

const Review = () => {
  const navigate = useNavigate();

  const linkStyle = {
    cursor: 'pointer', // Change the cursor to a pointer on hover
    flexGrow: 1, // Distribute links evenly across the Appbar
    textAlign: 'center', // Center align the link text
  };

  const [movies, setMovies] = React.useState([]);

  const [selectedMovie, setSelectedMovie] = React.useState('');   // initial state variable 'selectedMovies' (empty) and setter/updater function 'setSelectedMovies'
  const [enteredTitle, setEnteredTitle] = React.useState('');   //initial state variable 'enteredTitle' (empty) and setter/updater function 'setEnteredTitle'
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState('');
  const [confirmationMessage, setConfirmationMessage] = React.useState('');
  const [reviewData, setReviewData] = React.useState(null);

  const [userID] = React.useState(1);

  React.useEffect(() => {
    handleMoviesList();
  }, []);

  const handleMovieChange = (event) => {   // declares function named 'handleMovieChange' with 'event' parameter (event: responds to user input)
    setSelectedMovie(event.target.value);   // function call that updates the state variable 'selectedMovies' to the new value selected in the movie selection. 'event.target.value' retrieves the value selected from the event
    setConfirmationMessage('');   // function call that updates the state variable 'confirmationMessage' to an empty string (gets rid of message when writing a new review if a previous review was already submitted)
  };

  const handleTitleChange = (event) => {   // declares function named 'handleTitleChange' with an event object handler 
    setEnteredTitle(event.target.value);   // function call that updates the state variable 'enteredTitle' to the value selected ('event.target.value')
    setConfirmationMessage('');
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
    setConfirmationMessage('');
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setConfirmationMessage('');
  };




  const handleSubmit = () => {   // defines a function called 'handleSubmit' using arrow function syntax (called when submit button is clicked)
    console.log(selectedMovie);
    const errors = {};   // defines an empty object 'errors', used to store validation errors during submission

    if (!selectedMovie) {   // checks if selectedMovies is empty when
      errors.movieError = 'Select your movie.';   // if empty, assigns an error message to the 'movieError' property of the 'errors' object
    }

    if (!enteredTitle) {
      errors.titleError = 'Enter your review title.';
    }

    if (!enteredReview) {
      errors.reviewError = 'Enter your review.';
    }

    if (!selectedRating) {
      errors.ratingError = 'Select the rating.';
    }

    if (Object.keys(errors).length > 0) {   // checks if there was an error
      setErrorMessage(errors);   // if there is an error, function call that updates 'errorMessage' to the value of 'error'
      setConfirmationMessage('');
      return;   // exits the handleSubmit function early if there are errors
    }

    const selectedMovieID = movies.find(movie => movie.name === selectedMovie).id;

    const reviewData = {   // creates an object called 'reviewData' containing the review data(messages) for each heading
      movie: selectedMovie,
      title: enteredTitle,
      review: enteredReview,
      rating: selectedRating,
      userID: userID,
      movieID: selectedMovieID
    };

    fetch(serverURL + '/api/addReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmationMessage('Your review has been received.');
        setErrorMessage('');
        setReviewData(reviewData);
        setSelectedMovie('');
        setEnteredTitle('');
        setEnteredReview('');
        setSelectedRating('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Failed to submit the review.');
        setConfirmationMessage('');
      });
  };

  const handleMoviesList = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed[0])
        setMovies(parsed);
      });
  }

  const callApiGetMovies = async () => {

    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found movies: ", body);
    return body;
  }


  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/')}>
            Landing
          </Typography>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/Search')}>
            Search
          </Typography>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/Review')}>
            Review
          </Typography>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/MyPage')}>
            MyPage
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>   {/* Grid component from MUI, creates a grid container to hold the layout and sets the spacing between grid items */}
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>   {/* creates a grid item inside the container with a width of 12 (full width) */}
          <Typography variant="h3" style={{ marginTop: '20px' }}>Review a movie</Typography>   {/* creates a Typography component with a 'Heading 3' and displays text */}
        </Grid>

        <Grid item xs={12}>   {/* creates a grid item inside the container with a width of 12 */}
          <MovieSelection movies={movies} selectedMovie={selectedMovie} handleMovieChange={handleMovieChange} errorMessage={errorMessage} />   {/* creates a component 'MovieSelection', which passes props. (gives the prop 'movies' a value '{movies}') */}
        </Grid>

        <Grid item xs={12}>
          <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} errorMessage={errorMessage} />   {/* creates a component called 'ReviewTitle' and passes props, {handleTitleChange} is different colour since it passes a function as a reference  */}
        </Grid>

        <Grid item xs={12}>
          <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} errorMessage={errorMessage} />
        </Grid>

        <Grid item xs={12}>
          <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} errorMessage={errorMessage} />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>   {/* creates a Button component with variant 'contained' and sets an 'onClick' event handler to call the 'handleSubmit' function when clicked */}
        </Grid>

        {confirmationMessage && (   // conditional operator checks if 'confirmationMessage' is truthy (if there is a confirmation message), if true, renders the follow code in the component below
          <Grid item xs={12}>
            <Typography variant="body1">{confirmationMessage}</Typography>   {/* creates a Typography component, with the value of 'confirmationMessage' as the text */}
            {reviewData && (   // conditional operator checks if 'reviewData' if truthy' (if the review was successfully submitted) 
              <>
                <Typography variant="body1">Movie: {reviewData.movie}</Typography>   {/* adds a line of text containing the value of reviewData.movie */}
                <Typography variant="body1">Review Title: {reviewData.title}</Typography>
                <Typography variant="body1">Review: {reviewData.review}</Typography>
                <Typography variant="body1">Rating: {reviewData.rating}</Typography>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Review;