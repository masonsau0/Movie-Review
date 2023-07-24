import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [actorName, setActorName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    setMovieData([]);
  
    axios
      .post('/api/searchMovies', { title: movieTitle, actor: actorName, director: directorName })
      .then((response) => {
        const aggregatedMovies = response.data.reduce((acc, movie) => {
          const key = `${movie.movieTitle}_${movie.director}`;
          if (!acc[key]) {
            acc[key] = { ...movie, reviewContent: [movie.reviewContent], avgReviewScore: parseFloat(movie.avgReviewScore) };
          } else {
            acc[key].reviewContent.push(movie.reviewContent);
            acc[key].avgReviewScore =
              (acc[key].avgReviewScore + parseFloat(movie.avgReviewScore)) / acc[key].reviewContent.length;
          }
          return acc;
        }, {});
  
        setMovieData(Object.values(aggregatedMovies));
      })
      .catch((error) => {
        console.error('Error retrieving movie data:', error);
      });
  };
 
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Landing
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/Search')}
          >
            Search
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/Review')}
          >
            Review
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/MyPage')}
          >
            MyPage
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Typography variant="h3">Search for a Movie</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Movie title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          fullWidth
          style={{ marginTop: '30px', marginBottom: '30px' }}
        />
        <TextField
          label="Actor's name"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
          fullWidth
          style={{ marginBottom: '30px' }}
        />
        <TextField
          label="Director's name"
          value={directorName}
          onChange={(e) => setDirectorName(e.target.value)}
          fullWidth
          style={{ marginBottom: '30px' }}
        />
        <Button onClick={handleSearch} variant="contained" color="primary" style={{ marginLeft: '30px' }}>
          Search
        </Button>
      </div>
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





















