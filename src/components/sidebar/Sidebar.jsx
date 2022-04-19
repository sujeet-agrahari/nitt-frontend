/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Toolbar,
} from '@mui/material';
import {
  AccountBox,
  Class,
  CurrencyRupee,
  GridView,
  Group,
  GroupsRounded,
  Logout,
  ModeNight,
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
    navigate('/login');
  };
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        top: 50,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding component={Link} to="/" button>
            <ListItemButton>
              <ListItemIcon>
                <GridView />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to="/students" button>
            <ListItemButton>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to="/courses" button>
            <ListItemButton>
              <ListItemIcon>
                <Class />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to="/fees" button>
            <ListItemButton>
              <ListItemIcon>
                <CurrencyRupee />
              </ListItemIcon>
              <ListItemText primary="Fees" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to="/teachers" button>
            <ListItemButton>
              <ListItemIcon>
                <GroupsRounded />
              </ListItemIcon>
              <ListItemText primary="Teachers" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <Stack direction={'row'}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Stack>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
