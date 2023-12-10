//include OrderProduct Detail and Info Shipment
import { Box } from '@mui/material';
import React from 'react';
import OrderForm from '../../components/order/OrderInputForm';
import OrderItemList from '../../components/order/OrderItemList';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCouponId } from '../../redux/slice/cartSlice';
import { useLocation } from 'react-router-dom';
const CreateOrderPage = () => {
  const options = useSelector(selectCartItems);
  console.log(options);
  const couponId = useSelector(selectCouponId);
  console.log(couponId);
  const location = useLocation();
  // console.log(location.state.total);

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-evenly'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} justifyContent={'center'}>
          <OrderForm />
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <OrderItemList />
        </Box>
      </Box>
    </>
  );
};

export default CreateOrderPage;
