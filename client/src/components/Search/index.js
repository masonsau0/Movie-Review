import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const linkStyle = {
    cursor: 'pointer', // Change the cursor to a pointer on hover
    flexGrow: 1, // Distribute links evenly across the Appbar
    textAlign: 'center', // Center align the link text
  };

  const [movieTitle, setMovieTitle] = useState('');
  const [actorName, setActorName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [movieData, setMovieData] = useState([]);

  const handleSearch = () => {
    // Clears the existing movieData array to prepare for new search results
    setMovieData([]);

    // Makes a POST request to '/api/searchMovies' API endpoint with search parameters
    axios
      .post('/api/searchMovies', { title: movieTitle, actor: actorName, director: directorName })
      .then((response) => {
        // Processes the response data to aggregate movies with the same title and director
        const aggregatedMovies = response.data.reduce((acc, movie) => {
          // Creates a unique key for each movie based on movieTitle and director
          const key = `${movie.movieTitle}_${movie.director}`;

          // Checks if the movie with the same key already exists in the accumulator object (acc)
          if (!acc[key]) {
            // If not, create a new entry with initial values and the first review content
            acc[key] = { ...movie, reviewContent: [movie.reviewContent], avgReviewScore: parseFloat(movie.avgReviewScore) };
          } else {
            // If the movie already exists, update its data with the new review content and average score
            acc[key].reviewContent.push(movie.reviewContent);
            acc[key].avgReviewScore1 = (acc[key].avgReviewScore) * (acc[key].reviewContent.length - 1);
            acc[key].avgReviewScore = (acc[key].avgReviewScore1 + parseFloat(movie.avgReviewScore)) / acc[key].reviewContent.length;
            acc[key].avgReviewScore = acc[key].avgReviewScore.toFixed(1);
          }

          // Average review score becomes NaN (Not a Number)
          if (isNaN(acc[key].avgReviewScore)) {
            acc[key].avgReviewScore = '';
          }

          return acc;
        }, {});

        // Sets the movieData state to an array containing the aggregated movie data
        setMovieData(Object.values(aggregatedMovies));
      })
      .catch((error) => {
        // Errors if the request fails
        console.error('Error retrieving movie data:', error);
      });
  };


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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="h3">Search for a Movie</Typography>
      </div>


      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <Typography variant="h6" style={{ marginBottom: '-10px', fontSize: '16px' }}>Search by Movie Title:</Typography>
        <TextField label="Movie title" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} fullWidth style={{ marginTop: '10px', marginBottom: '20px' }} />

        <Typography variant="h6" style={{ marginBottom: '-2px', fontSize: '16px' }}>Search by Actor's Name:</Typography>
        <TextField label="Actor's name" value={actorName} onChange={(e) => setActorName(e.target.value)} fullWidth style={{ marginBottom: '20px' }} />

        <Typography variant="h6" style={{ marginBottom: '-2px', fontSize: '16px' }}>Search by Director's Name:</Typography>
        <TextField label="Director's name" value={directorName} onChange={(e) => setDirectorName(e.target.value)} fullWidth style={{ marginBottom: '20px' }} />
      </div>
      <Button onClick={handleSearch} variant="contained" color="primary" style={{ marginLeft: '900px' }}>
        Search
      </Button>

      {movieData.length > 0 && (
        <div style={{ marginLeft: '10px' }}>
          <h2>Search Results:</h2>
          <ul>
            {movieData.map((movie) => (
              <li key={movie.movieTitle}>
                <strong>Movie Title:</strong> {movie.movieTitle}
                <br />
                <strong>Director:</strong> {movie.director}
                <br />
                <strong>Reviews:</strong> {Array.isArray(movie.reviewContent) ? movie.reviewContent.join(', ') : movie.reviewContent}
                <br />
                <strong>Average Review Score:</strong> {movie.avgReviewScore}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;





















