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

      <div style={{ padding: '30px', textAlign: 'center' }}>
        <Typography variant="h3" color="inherit" noWrap>
          Welcome to the Movie App
        </Typography>
        <Typography variant="h5" color="inherit" noWrap style={{ marginTop: '10px' }}>
          Find and review your favorite movies!
        </Typography>
      </div>
    </div>
  );
};



export default Landing;


