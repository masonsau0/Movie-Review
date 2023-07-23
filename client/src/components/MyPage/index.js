import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const MyPage = () => {
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
          <Typography variant="h6" component={Link} to="/Review">
            Review
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {/* Your custom content for MyPage goes here */}
        <Typography variant="h3" color="inherit" noWrap>
          My Page
        </Typography>
        {/* Your MyPage content and functionality go here */}
      </div>
    </div>
  );
};

export default MyPage;
