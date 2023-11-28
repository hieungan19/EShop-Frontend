import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Container,
} from '@mui/material';

const OrderCard = () => {
  const data = {
    orderId: '12345',
    orderDate: new Date('2023-11-16T12:30:00'),
    orderTotalAmount: 150.75,
    userAddress: '123 Main Street, City, Country',
    paymentStatus: true,
    userPhoneNumber: '02312342423', // Change this based on the payment status
  };
  return (
    <Container>
      <Card>
        <CardContent sx={{ py: 1 }}>
          <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <Typography variant='h6' fontWeight={'bold'} mr={4}>
              # {data.orderId}
            </Typography>
            <Chip
              label={data.paymentStatus ? 'Paid' : 'UnPay'}
              color={data.paymentStatus ? 'primary' : 'secondary'}
            />
          </Box>
          <Typography variant='subtitle2' color='textSecondary' gutterBottom>
            {data.orderDate.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='textSecondary' gutterBottom>
            <b>Order Total Amount:</b>{' '}
            <span
              style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'green' }}
            >
              ${data.orderTotalAmount}
            </span>
          </Typography>
          <Typography variant='body2' component='p' color='textSecondary'>
            <b>User Phone Number:</b>
            <span style={{ color: 'black' }}>{data.userPhoneNumber}</span>
          </Typography>
          <Typography
            variant='body2'
            component='p'
            color='textSecondary'
            mt={0.5}
          >
            <b>User Address:</b>
            <span style={{ color: 'black' }}>{data.userAddress}</span>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderCard;
