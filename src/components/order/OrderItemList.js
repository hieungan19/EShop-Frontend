//Include Order Item and Chi tiết thành tiên + tiền trừ khuyến mãi+ Phương thức thanh toán
import React from 'react';
import { Typography, Box, Divider, Alert } from '@mui/material';
import OrderProductItemCard from './OrderProductItemCard'; // Import the OrderedProductItem component
import { Colors } from '../../styles/theme';

const OrderItemList = ({ order }) => {
  const fakeOrder = {
    orderedProducts: [
      {
        product: {
          image: 'path/to/product-image1.jpg',
          name: 'Product 1',
          option: { name: 'Option A', price: 10 },
          price: 10,
          quantity: 2,
        },
      },
      {
        product: {
          image: 'path/to/product-image2.jpg',
          name: 'Product 2',
          option: { name: 'Option B', price: 15 },
          price: 15,
          quantity: 1,
        },
      },
    ],
    subtotal: 35,
    discount: 5,
    total: 30000,
    paymentMethod: 'Ship COD',
    isPaid: false,
  };
  const { orderedProducts, subtotal, discount, total, paymentMethod, isPaid } =
    fakeOrder;

  return (
    <Box sx={{ width: { xs: '350px', md: '450px' }, px: 1 }}>
      <Typography
        textAlign={'center'}
        variant='body1'
        fontWeight={'bold'}
        mb={'bold'}
      >
        Danh sách sản phẩm
      </Typography>
      {/* List of ordered products */}
      {orderedProducts.map((product, index) => (
        <OrderProductItemCard key={index} />
      ))}

      {/* Subtotal, discount, and total */}
      <Typography variant='body2' color='textSecondary' mt={2}>
        Tổng cộng: {subtotal.toLocaleString()} đ
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        Giảm giá: {discount.toLocaleString()} đ
      </Typography>
      <Box display='flex' justifyContent='flex-end' alignItems='center'>
        <Typography variant='subtitle1' color='textSecondary'>
          Thành tiền:{' '}
          <span style={{ fontWeight: 'bold', color: Colors.secondary }}>
            {total.toLocaleString()}
          </span>{' '}
        </Typography>
      </Box>

      <Divider
        sx={{ width: '100%', backgroundColor: Colors.white, height: '3px' }}
      />

      {/* Payment method and status */}
      <Typography variant='body2' color='textSecondary' mt={2}>
        Phương thức thanh toán: {paymentMethod}
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        Tình trạng thanh toán:{' '}
        <span
          style={{
            color: isPaid ? Colors.primary : Colors.secondary,
            fontWeight: 'bold',
          }}
        >
          {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      </Typography>

      {/* Display warning message for "ship cod" payment method */}
      {paymentMethod.toLowerCase() === 'ship cod' && isPaid === false && (
        <Alert severity='warning' style={{ marginTop: '16px' }}>
          Vui lòng thanh toán {total.toLocaleString()} khi nhận hàng
        </Alert>
      )}
    </Box>
  );
};

export default OrderItemList;
