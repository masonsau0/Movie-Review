import React from 'react';
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
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
    </div>
  );
};
    
export default MyPage;