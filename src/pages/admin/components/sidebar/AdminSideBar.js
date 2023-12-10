import React, { useState } from 'react';
import {
  Avatar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import { Colors } from '../../../../styles/theme';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectAvatarUrl,
  selectFullName,
} from '../../../../redux/slice/authSlice';
const drawerWidth = 220;
const itemList = [
  'HOME',
  'CATEGORIES',
  'PRODUCTS',
  'COUPONS',
  'ORDERS',
  'CUSTOMERS',
];
const AdminSideBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const userFullname = useSelector(selectFullName);
  const avatarUrl = useSelector(selectAvatarUrl);
  const navigate = useNavigate();
  const handleListItemClick = (index) => {
    setActiveIndex(index);
    const selectedRoute = itemList[index];
    navigate(`/admin/${selectedRoute.toLowerCase()}`);
  };

  const icons = [
    <HomeIcon key='home-icon' />,
    <CategoryIcon key='category-icon' />,
    <StoreIcon key='store-icon' />,
    <LocalOfferIcon key='local-offer-icon' />,
    <AssignmentIcon key='assignment-icon' />,
    <GroupIcon key='customer' />,
  ];

  return (
    <Drawer
      sx={{
        overflow: 'hidden',
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <Container sx={{ py: 4 }}>
        <Avatar
          src={avatarUrl}
          sx={{
            mx: 'auto',
            p: 0,
            alignSelf: 'center',
            width: '54px',
            height: '54px',
          }}
        />
        <Typography
          sx={{
            textAlign: 'center',
            color: Colors.dark,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          {userFullname}
        </Typography>
      </Container>
      <List sx={{ py: 0 }}>
        {itemList.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              borderBottom:
                index === activeIndex ? `2px solid ${Colors.primary}` : 'none',
            }}
          >
            <ListItemButton
              selected={index === activeIndex}
              onClick={() => handleListItemClick(index)}
              sx={{
                width: drawerWidth,
                color: index === activeIndex ? Colors.white : Colors.dark,
              }}
            >
              <ListItemIcon
                style={{
                  color: index === activeIndex ? Colors.white : Colors.dark,
                }}
              >
                {icons[index]}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  fontWeight: 600,
                  color: index === activeIndex ? Colors.white : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSideBar;
