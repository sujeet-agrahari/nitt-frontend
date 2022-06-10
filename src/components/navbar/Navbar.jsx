/* eslint-disable no-unused-vars */
import { Mail, Notifications, Pets } from '@mui/icons-material';
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/AuthContext';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: '20px',
  alignItems: 'center ',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { dispatch: authDispatch, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}
        >
          NITTI
        </Typography>
        <Pets
          sx={{
            display: {
              xs: 'block',
              sm: 'none',
            },
          }}
        />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Avatar
            src={currentUser.Student.photo}
            onClick={(e) => setOpen(true)}
            sx={{
              width: 30,
              height: 30,
            }}
          />
        </Icons>
        <UserBox onClick={() => setOpen(true)}>
          <Avatar
            src={currentUser.Student.photo}
            sx={{
              width: 30,
              height: 30,
            }}
          />
          <Typography variant="span">{currentUser.Student.firstName}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="demo-positioned-button"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
