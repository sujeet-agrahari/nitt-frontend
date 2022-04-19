import './home.scss';
import { Box, CssBaseline, Stack } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';

const Home = () => (
  <Box>
    {/* removes any margin from element below it */}
    <CssBaseline />
    <Navbar />
    <Stack direction={'row'} spacing={2}>
      <Sidebar />
      <Dashboard />
    </Stack>
  </Box>
  // <div className="home">
  //   <Sidebar></Sidebar>
  //   <div className="homeContainer">
  //     <Navbar />
  //     <div className="widgets">
  //       <Widget type="student" />
  //       <Widget type="earning" />
  //       <Widget type="course" />
  //     </div>
  //     <div className="charts">
  //       <Featured />
  //       <Chart aspect={2 / 1} title="Last 6 months (Revenue)" />
  //     </div>
  //     <div className="listContainer">
  //       <div className="listTitle">Recently Added Students</div>
  //       <Table />
  //     </div>
  //   </div>
  // </div>
);

export default Home;
