import React, { useState } from 'react';
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
            acc[key].avgReviewScore1 =
            (acc[key].avgReviewScore) * (acc[key].reviewContent.length - 1);
            acc[key].avgReviewScore =
              (acc[key].avgReviewScore1 + parseFloat(movie.avgReviewScore)) / acc[key].reviewContent.length;
            acc[key].avgReviewScore = acc[key].avgReviewScore.toFixed(1);
          }
          if (isNaN(acc[key].avgReviewScore)) {
            acc[key].avgReviewScore = '';
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
        <TextField label="Movie title" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} fullWidth style={{ marginTop: '10px', marginBottom: '20px' }}/>

        <Typography variant="h6" style={{ marginBottom: '-2px', fontSize: '16px' }}>Search by Actor's Name:</Typography>
        <TextField label="Actor's name" value={actorName} onChange={(e) => setActorName(e.target.value)} fullWidth style={{ marginBottom: '20px' }}/>

        <Typography variant="h6" style={{ marginBottom: '-2px', fontSize: '16px' }}>Search by Director's Name:</Typography>
        <TextField label="Director's name" value={directorName} onChange={(e) => setDirectorName(e.target.value)} fullWidth style={{ marginBottom: '20px' }}/>
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





















