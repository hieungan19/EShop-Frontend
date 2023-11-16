import {
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Colors } from '../../../../styles/theme';
const drawerWidth = 200;

const AdminSideBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <Box
      sx={{
        width: drawerWidth,
        minHeight: '100vh',
        backgroundColor: Colors.light_gray,
        flexShrink: 0,
        position: 'sticky',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Container sx={{ py: 4, backgroundColor: Colors.dove_gray }}>
        <Avatar sx={{ mx: 'auto', p: 0, alignSelf: 'center' }} />
        <Typography
          sx={{
            textAlign: 'center',
            color: Colors.dark,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          User name
        </Typography>
      </Container>
      <List sx={{ backgroundColor: Colors.light_gray, py: 0 }}>
        {['HOME', 'CATEGORIES', 'PRODUCTS', 'DISCOUNT', 'ORDERS'].map(
          (text, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                borderBottom:
                  index === activeIndex
                    ? `2px solid ${Colors.primary}`
                    : 'none',
              }}
            >
              <ListItemButton
                selected={index === activeIndex}
                onClick={() => handleListItemClick(index)}
                sx={{ width: drawerWidth }}
              >
                <ListItemText primary={text} sx={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
};

export default AdminSideBar;
