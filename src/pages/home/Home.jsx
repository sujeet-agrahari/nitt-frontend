import { Box, Stack, Typography } from '@mui/material';
import { AuthContext } from 'src/context/AuthContext';
import { useContext } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import Carousel from './Carousel';
import { Footer } from './Footer';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <ResponsiveAppBar isLoggedIn={currentUser} />
      <Stack sx={{ flexDirection: 'row', ml: '5%', height: '600px' }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            color: '#ED830D',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1">Our only</Typography>
          <Typography variant="h1">concern is </Typography>
          <Typography variant="h1">your </Typography>
          <Typography variant="h1">education </Typography>
        </Box>
        {/* <Box component={'img'} src="static/hero.jpeg" width="70%" /> */}
        <Carousel />
      </Stack>
      <Box> Hello</Box>
      <Footer />
    </>
  );
};
export default Home;
