import { Box } from '@mui/material';
import React from 'react';
import OrderCard from '../../components/order/OrderCard';

const OrderList = ({ orders }) => {
  return (
    <Box>
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} />
      ))}
    </Box>
  );
};

export default OrderList;
