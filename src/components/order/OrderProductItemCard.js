import { Box, Typography } from '@mui/material';
import React from 'react';
import { Colors } from '../../styles/theme';

const OrderedProductItemCard = ({ item }) => {
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
            src={item.productImageUrl}
            alt={item.productName}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
            }}
          />
        </Box>

        <Box mr={4} flexGrow={1}>
          <Typography variant='subtitle1'>{item.productName}</Typography>
          <Typography variant='body2' color='textSecondary'>
            <b>Option:</b> {item.name} -{' '}
            {item.currentPrice
              ? item.currentPrice.toLocaleString()
              : (item.unitPrice - item.discountAmount).toLocaleString()}
          </Typography>

          <Typography variant='body2' fontWeight={'bold'} color='secondary'>
            x{item.quantity}
          </Typography>

          <Box display='flex' justifyContent='flex-end' alignItems='center'>
            <Typography variant='body2' color='secondary'>
              <b>
                {item.currentPrice
                  ? (item.quantity * item.currentPrice).toLocaleString()
                  : (
                      item.quantity *
                      (item.unitPrice - item.discountAmount)
                    ).toLocaleString()}
              </b>{' '}
              đ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderedProductItemCard;
