import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import { Colors } from '../../styles/theme';
import { formatDateTime } from '../../utils/FormatDateTime';
import { OrderStatus } from '../../utils/Constant';

const InforShipment = ({ order }) => {
  return (
    <Container component='main' maxWidth='xs'>
      <Container
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component='h1' variant='h5'>
          Thông tin vận chuyển
        </Typography>
        <Card sx={{ my: 2 }} elevation={3}>
          <CardContent>
            <Typography
              variant='subtitle1'
              gutterBottom
              fontWeight={'bold'}
              color={Colors.primary}
            >
              Mã hóa đơn: {order.id}
            </Typography>
            <Typography variant='body2' color='textSecondary' gutterBottom>
              Ngày đặt hàng: {formatDateTime(order.orderDate)}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Trạng thái: {OrderStatus[order.status]}
            </Typography>
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant='body2' fontWeight={'bold'}>
              Người nhận: {order.receiverName}
            </Typography>
            <Typography variant='body2' color='textSecondary' gutterBottom>
              Địa chỉ: {order.shippingAddress}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Số điện thoại: {order.mobilePhone}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default InforShipment;
