//include OrderProduct Detail and Info Shipment
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import OrderItemList from './OrderItemList';
import InforShipment from './InforShipment';
import { Colors } from '../../styles/theme';

const Invoice = () => {
  return (
    <>
      <Typography
        textAlign={'center'}
        color={Colors.primary}
        variant='h5'
        fontWeight={'bold'}
      >
        HÓA ĐƠN
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-evenly'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} justifyContent={'center'}>
          <InforShipment />
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <OrderItemList />
        </Box>
      </Box>
    </>
  );
};

export default Invoice;
