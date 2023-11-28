import { Box, Typography } from '@mui/material';
import React from 'react';
import { Colors } from '../../styles/theme';

const OrderedProductItemCard = () => {
  const fakeProduct = {
    image: 'https://placekitten.com/200/300',
    name: 'Sample Product',
    option: { name: 'Sample Option', price: 10 },
    price: 10000,
    quantity: 3,
  };
  const { image, name, option, price, quantity } = fakeProduct;
  const total = price * quantity;

  return (
    <Box
      sx={{
        backgroundColor: Colors.white,
        p: 2,
        my: 1,
      }}
    >
      <Box display='flex' alignItems='center'>
        <Box
          width={'120px'}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <img
            src={image}
            alt={name}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
            }}
          />
        </Box>

        <Box mr={4} flexGrow={1}>
          <Typography variant='subtitle1'>{name}</Typography>
          <Typography variant='body2' color='textSecondary'>
            <b>Option:</b> {option.name} - {option.price.toLocaleString()}
          </Typography>

          <Typography variant='body2' fontWeight={'bold'} color='secondary'>
            x{quantity}
          </Typography>

          <Box display='flex' justifyContent='flex-end' alignItems='center'>
            <Typography variant='body2' color='secondary'>
              <b>{total.toLocaleString()}</b> đ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderedProductItemCard;
