import { Box, Container } from '@mui/material';

const Home = () => (
  <Container
    sx={{
      position: 'relative',
    }}
  >
    {/* <Box component="img" src="/static/illustrations/startup-life-animate.svg" /> */}
    <Box
      sx={{
        position: 'absolute',
        transform: 'translateX(-50%)',
      }}
    >
      <Box component="img" src="/static/illustrations/blob.svg" />
    </Box>
  </Container>
);

export default Home;
