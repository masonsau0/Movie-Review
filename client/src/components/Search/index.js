import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');

  const handleSearch = () => {
    // Here you can handle the search logic and send the search criteria to the server
    // For now, let's just display the search criteria on the console
    console.log('Title:', title);
    console.log('Actor:', actor);
    console.log('Director:', director);
  };

  const appbarLinkStyle = {
    cursor: 'pointer', // Change the cursor to a pointer on hover
    flexGrow: 1, // Distribute links evenly across the Appbar
    textAlign: 'center', // Center align the link text
    textDecoration: 'none', // Remove underline from the links
    color: 'white', // Set the font color to white
  };

  return (
    <div style={{ backgroundColor: 'grey', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex' }}>
          <Link variant="h6" style={appbarLinkStyle} onClick={() => navigate('/')}>
            Movie App
          </Link>
          <Link variant="h6" style={appbarLinkStyle} onClick={() => navigate('/Search')}>
            Search
          </Link>
          <Link variant="h6" style={appbarLinkStyle} onClick={() => navigate('/Review')}>
            Review
          </Link>
          <Link variant="h6" style={appbarLinkStyle} onClick={() => navigate('/MyPage')}>
            My Page
          </Link>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        <Typography variant="h3" color="inherit" noWrap>
          Movie Search
        </Typography>
        <TextField
          label="Movie Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Actor's First Name + Last Name"
          variant="outlined"
          fullWidth
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Director's First Name + Last Name"
          variant="outlined"
          fullWidth
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;



