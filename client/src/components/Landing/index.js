import React from 'react';
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const linkStyle = {
    cursor: 'pointer', // Change the cursor to a pointer on hover
    flexGrow: 1, // Distribute links evenly across the Appbar
    textAlign: 'center', // Center align the link text
  };

  return (
    <div style={{ backgroundColor: 'grey', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex' }}>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/')}>
            Movie App
          </Typography>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/Search')}>
            Search
          </Typography>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/Review')}>
            Review
          </Typography>
          <Typography variant="h6" style={linkStyle} onClick={() => navigate('/MyPage')}>
            My Page
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        <Typography variant="h3" color="inherit" noWrap>
          Welcome to Movie App
        </Typography>
        <Typography variant="h5" color="inherit" noWrap>
          Find and review your favorite movies!
        </Typography>
        {/* Your custom content for the Landing page goes here */}
        <Typography variant="body1" color="inherit" noWrap>
          Explore the world of movies with Movie App. Whether you're a movie enthusiast or just looking for something to watch, our app has something for you. Search for movies by title, actor, or director to discover new favorites. Write reviews and share your thoughts with the movie-loving community.
        </Typography>
      </div>
    </div>
  );
};

export default Landing;


