//Include Order Item and Chi tiết thành tiên + tiền trừ khuyến mãi+ Phương thức thanh toán
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  selectOrderPaymentMethod,
  selectSelectedItems,
} from '../../redux/slice/cartSlice';
import { Colors } from '../../styles/theme';
import OrderProductItemCard from './OrderProductItemCard'; // Import the OrderedProductItem component

const OrderItemList = ({ order }) => {
  console.log(order);
  const cartItems = useSelector(selectSelectedItems);
  const navigate = useNavigate();
  const location = useLocation();
  const total = location.state ? location.state.total : 0;
  const realTotal = location.state ? location.state.realTotal : 0;

  const paymentMethod = useSelector(selectOrderPaymentMethod);
  const navigateToReviewPage = () => {
    navigate(`/review/${order.id}`, { state: { items: order.orderItems } });
  };
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
          Sản phẩm
        </Typography>
        {/* List of ordered products */}
        {order
          ? order.orderItems.map((item, index) => (
              <OrderProductItemCard key={index} item={item} />
            ))
          : cartItems.map((item, index) => (
              <OrderProductItemCard key={index} item={item} />
            ))}

        {order && order.status === 2 ? (
          <Button
            sx={{ alignSelf: 'flex-end', my: 1 }}
            variant='contained'
            color='secondary'
            onClick={navigateToReviewPage}
          >
            Đánh giá
          </Button>
        ) : null}

        {/* Subtotal, discount, and total */}
        <Typography variant='body2' color='textSecondary' mt={2}>
          Tổng cộng:{' '}
          {order ? order.totalPrice.toLocaleString() : total.toLocaleString()} đ
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Giảm giá:{' '}
          {order
            ? order.discountAmount.toLocaleString()
            : (total - realTotal).toLocaleString()}{' '}
          đ
        </Typography>
        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <Typography variant='subtitle1' color='textSecondary'>
            Thành tiền:{' '}
            <span style={{ fontWeight: 'bold', color: Colors.secondary }}>
              {order
                ? (order.totalPrice - order.discountAmount).toLocaleString()
                : realTotal.toLocaleString()}
            </span>{' '}
          </Typography>
        </Box>

        <Divider
          sx={{ width: '100%', backgroundColor: Colors.white, height: '3px' }}
        />

        {/* Payment method and status */}
        <Typography variant='body2' color='textSecondary' mt={2}>
          Phương thức thanh toán:{' '}
          {paymentMethod === 0 ? 'SHIP COD' : 'Chuyển khoản Momo'}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Tình trạng thanh toán:{' '}
          <span
            style={{
              color: order && order.isPayed ? Colors.primary : Colors.secondary,
              fontWeight: 'bold',
            }}
          >
            {order && order.isPayed ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </span>
        </Typography>

        {/* Display warning message for "ship cod" payment method */}
        {paymentMethod === 0 && order.isPayed === false && (
          <Alert severity='warning' style={{ marginTop: '16px' }}>
            Vui lòng thanh toán {realTotal.toLocaleString()} khi nhận hàng
          </Alert>
        )}
      </Container>
    </Container>
  );
};

export default OrderItemList;
