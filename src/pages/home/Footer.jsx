import { Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';

export const Footer = () => (
  <Box
    sx={{
      backgroundColor: '#0D3050',
      height: '400px',
      color: 'white',
    }}
  >
    <Grid container>
      <Grid item xs={4}>
        <Stack padding={3}>
          <Typography variant="h6">Contact Us</Typography>
          <Stack direction={'row'} gap={2} pt={3}>
            <PhoneIcon />
            <Box>
              <Typography variant="body2"> 9956614138</Typography>
              <Typography variant="body2"> 9044964138</Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Box> 2</Box>
      </Grid>
      <Grid item xs={4}>
        <Box> 3</Box>
      </Grid>
    </Grid>
    <Grid
      container
      justifyContent="center"
      sx={{
        borderTop: '0.5px solid white',
        pt: '100px',
      }}
    >
      <Grid item textAlign="center">
        <Typography variant="body2">NITTI </Typography>
        <Typography variant="body2">Copyright&#169; 2022-2023</Typography>
      </Grid>
    </Grid>
  </Box>
);
