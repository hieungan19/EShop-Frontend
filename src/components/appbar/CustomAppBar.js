import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo/logo.svg';
import {
  REMOVE_ACTIVE_USER,
  selectIsLoggedIn,
} from '../../redux/slice/authSlice';
import { MyButton, StyledBadge } from '../../styles/appbarStyle';
import AdminOnlyRoute from '../admin-only-route/AdminOnlyRoute';
import styled from '@emotion/styled';
import { selectCartTotalQuantity } from '../../redux/slice/cartSlice';

const settings = ['Account', 'Orders', 'Log Out'];
const LogoComponent = () => (
  <Link>
    <Avatar
      variant={'square'}
      alt='Logo'
      src={Logo}
      style={{
        width: 70,
      }}
    />
  </Link>
);

const StyledMenu = styled(Menu)({
  position: 'absolute',
  top: '100%',
  right: 0,
  left: 0,
  width: '100%',
  zIndex: 1,
});

const CustomAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkIsLogedIn = useSelector(selectIsLoggedIn);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Change appbar status');

    setIsLoggedIn(checkIsLogedIn);
    console.log('IS LOGGED IN: ', isLoggedIn);
  }, [dispatch, checkIsLogedIn, isLoggedIn]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting) => {
    if (setting === 'Log Out') {
      dispatch(REMOVE_ACTIVE_USER());
      navigate('/login');
    }

    setAnchorElUser(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id='mobile-menu'
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Typography variant='body2'>Home</Typography>
      </MenuItem>

      {isLoggedIn ? (
        settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => {
              handleCloseUserMenu(setting);
            }}
          >
            <Typography textAlign='center' variant='body2'>
              {setting}
            </Typography>
          </MenuItem>
        ))
      ) : (
        <MenuList>
          <MenuItem>
            <Typography variant='body2'>Login</Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant='body2'>Register</Typography>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar sx={{ position: 'static' }}>
        <Toolbar>
          <LogoComponent />

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Link to='/'>
              <MyButton sx={{ fontSize: '16px' }}>HOME</MyButton>
            </Link>
            <AdminOnlyRoute>
              <Link to='/admin/'>
                <MyButton
                  sx={{
                    fontSize: '16px',
                    border: '1px solid black',
                    borderRadius: '10px',
                  }}
                >
                  ADMIN
                </MyButton>
              </Link>
            </AdminOnlyRoute>
            {isLoggedIn ? (
              <></>
            ) : (
              <>
                <Link to='/login'>
                  <MyButton sx={{ fontSize: '16px' }}>LOGIN</MyButton>
                </Link>
                <Link to='register'>
                  <MyButton sx={{ fontSize: '16px' }}>REGISTER</MyButton>
                </Link>
              </>
            )}

            {isLoggedIn === true ? (
              <>
                <IconButton aria-label='cart' onClick={() => navigate('/cart')}>
                  <StyledBadge badgeContent={cartQuantity} color='secondary'>
                    <ShoppingCartIcon sx={{ fontSize: 32 }} />
                  </StyledBadge>
                </IconButton>

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu(setting);
                      }}
                    >
                      <Typography textAlign='center' variant='body2'>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'end',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls='mobile-menu'
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreHorizIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default CustomAppBar;
