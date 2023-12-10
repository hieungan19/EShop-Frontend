import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { formatDateTime } from '../../utils/FormatDateTime';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  return (
    <Box
      mb={2}
      onClick={() => {
        navigate(`/orders/${order.id}`);
      }}
    >
      <Card>
        <CardContent sx={{ py: 1 }}>
          <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <Typography variant='h6' fontWeight={'bold'} mr={4}>
              # {order.id}
            </Typography>
            <Chip
              label={order.isPayed ? 'Đã thanh toán' : 'Chưa thanh toán'}
              color={order.isPayed ? 'primary' : 'secondary'}
            />
          </Box>
          <Typography variant='subtitle2' color='textSecondary' gutterBottom>
            {formatDateTime(order.orderDate)}
          </Typography>
          <Typography variant='body2' color='textSecondary' gutterBottom>
            <b>Tổng cộng:</b>{' '}
            <span
              style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'green' }}
            >
              {(order.totalPrice - order.discountAmount).toLocaleString()}
            </span>
          </Typography>
          <Typography variant='body2' component='p' color='textSecondary'>
            <b>Người nhận:</b>
            <span style={{ color: 'black' }}>{order.receiverName}</span>
          </Typography>
          <Typography variant='body2' component='p' color='textSecondary'>
            <b>Số điện thoại:</b>
            <span style={{ color: 'black' }}>{order.mobilePhone}</span>
          </Typography>
          <Typography variant='body2' component='p' color='textSecondary'>
            <b>Địa chỉ:</b>
            <span style={{ color: 'black' }}>{order.shippingAddress}</span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderCard;
