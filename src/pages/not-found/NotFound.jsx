import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container>
    <Typography variant="h3" paragraph>
      Sorry, page not found!
    </Typography>

    <Typography sx={{ color: 'text.secondary' }}>
      Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
      spelling.
    </Typography>

    <Box
      component="img"
      src="/static/illustrations/illustration_404.svg"
      sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
    />

    <Button to="/dashboard" size="large" variant="contained" component={Link}>
      Go to Home
    </Button>
  </Container>
);

export default NotFound;
