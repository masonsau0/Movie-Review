import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MyPage = () => {
  const navigate = useNavigate();

  const [movieTitle, setMovieTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleMovieTitleChange = (event) => {
    setMovieTitle(event.target.value);
  };

  const handleGetRecommendations = () => {
    axios.post('/api/movieRecommendations', { movieTitle })
      .then((response) => {
        // Filter out movies with liked value as 0
        const filteredRecommendations = response.data.filter((movie) => movie.liked !== 0);
  
        // Initialize liked value as null for each recommendation
        const recommendationsWithID = filteredRecommendations.map((movie) => ({
          ...movie,
          liked: null,
        }));
  
        setRecommendations(recommendationsWithID);
      })
      .catch((error) => {
        console.error('Error fetching movie recommendations:', error);
      });
  };
  

  const handleLike = (movieID) => {
    // Update liked status for the recommendation with the corresponding movieID
    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((movie) =>
        movie.movie_id === movieID ? { ...movie, liked: true } : movie
      )
    );
  
    // Send the liked movieID to the server
    axios.post('/api/saveLike', { userID: 1, movieID: movieID })
      .then((response) => {
        console.log('Liked Movie ID:', movieID);
        console.log('Response from the server:', response.data);
      })
      .catch((error) => {
        console.error('Error saving like:', error);
      });
  };

  const handleDislike = (movieID) => {
    // Remove the disliked movie from the recommendations array
    setRecommendations((prevRecommendations) =>
      prevRecommendations.filter((movie) => movie.movie_id !== movieID)
    );
  
    // Send the disliked movieID to the server (if you want to save the dislike information)
    axios.post('/api/saveDislike', { userID: 1, movieID: movieID })
      .then((response) => {
        console.log('Disliked Movie ID:', movieID);
        console.log('Response from the server:', response.data);
      })
      .catch((error) => {
        console.error('Error saving dislike:', error);
      });
  };
  
 

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography variant="h6" onClick={() => navigate('/')}>
            Landing
          </Typography>
          <Typography variant="h6" onClick={() => navigate('/Search')}>
            Search
          </Typography>
          <Typography variant="h6" onClick={() => navigate('/Review')}>
            Review
          </Typography>
          <Typography variant="h6" onClick={() => navigate('/MyPage')}>
            MyPage
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h3">Movie Recommendations</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', flexDirection: 'column' }}>
          <TextField
            label="Enter a movie title"
            variant="outlined"
            value={movieTitle}
            onChange={handleMovieTitleChange}
            style={{ width: '70%' }}
          />
          <Button variant="contained" onClick={handleGetRecommendations} style={{ marginTop: '20px' }}>
            Get Recommendations
          </Button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h4">Movie Recommendations</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', flexDirection: 'column' }}>
          {/* Movie Recommendations */}
          {recommendations.map((movie) => (
            <div key={movie.movieTitle} style={{ marginTop: '10px' }}>
              <Typography variant="h5">{movie.movieTitle}</Typography>
              <Typography variant="body1">Lead Actors: {movie.leadActors}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleLike(movie.movie_id)}>Like</Button> {/* Like button */}
              <Button variant="contained" color="secondary" onClick={() => handleDislike(movie.movie_id)}>Dislike</Button> {/* Dislike button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;




















