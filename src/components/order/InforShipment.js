import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Colors } from '../../styles/theme';

const InforShipment = () => {
  const data = {
    orderId: '12345',
    orderDateTime: new Date('2023-11-16T12:30:00'),
    shipmentStatus: 'In Transit',
    fullName: 'John Doe',
    address: '123 Main Street, City, Country',
    phoneNumber: '0123456789',
  };

  return (
    <Box sx={{ width: { xs: '350px', md: '450px' }, px: 1, mb: 2 }}>
      <Typography
        textAlign={'center'}
        variant='body1'
        fontWeight={'bold'}
        mb={2}
      >
        Thông tin vận chuyển
      </Typography>
      <Card sx={{ mb: 2 }} elevation={3}>
        <CardContent>
          <Typography
            variant='subtitle1'
            gutterBottom
            fontWeight={'bold'}
            color={Colors.primary}
          >
            Order ID: {data.orderId}
          </Typography>
          <Typography variant='body2' color='textSecondary' gutterBottom>
            Date Time Order: {data.orderDateTime.toLocaleString()}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Shipment Status: {data.shipmentStatus}
          </Typography>
        </CardContent>
      </Card>
      <Card elevation={3}>
        <CardContent>
          <Typography variant='body2' fontWeight={'bold'}>
            Full Name: {data.fullName}
          </Typography>
          <Typography variant='body2' color='textSecondary' gutterBottom>
            Address: {data.address}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            Phone Number: {data.phoneNumber}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InforShipment;
