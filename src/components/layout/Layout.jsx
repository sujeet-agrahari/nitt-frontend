import { Box, CssBaseline, Stack } from '@mui/material';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => (
  <Box>
    {/* removes any margin from element below it */}
    <CssBaseline />
    <Navbar />
    <Stack direction={'row'} spacing={2}>
      <Sidebar />
      {children}
    </Stack>
  </Box>
);

export default Layout;
