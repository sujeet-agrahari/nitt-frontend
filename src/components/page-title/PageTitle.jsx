import { Add } from '@mui/icons-material';
import { Box, Fab, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ pageTitle, addButton, to, margin = 2 }) => (
  <Stack margin={margin} direction="row" justifyContent="space-between">
    <Box>
      <Typography
        variant="div"
        sx={{
          color: 'gray',
          fontSize: '24px',
        }}
      >
        {pageTitle}
      </Typography>
    </Box>
    {addButton && (
      <Box>
        <Link to={to} style={{ textDecoration: 'none' }}>
          <Fab color="success" aria-label="add">
            <Add />
          </Fab>
        </Link>
      </Box>
    )}
  </Stack>
);

export default PageTitle;
