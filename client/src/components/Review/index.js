import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Review = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/">
            Movie App
          </Typography>
          <Typography variant="h6" component={Link} to="/Search">
            Search
          </Typography>
          <Typography variant="h6" component={Link} to="/MyPage">
            My Page
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {/* Your review functionality goes here */}
        <Typography variant="h3" color="inherit" noWrap>
          Write Movie Review
        </Typography>
        {/* Your review form and functionality go here */}
      </div>
    </div>
  );
};

export default Review;
