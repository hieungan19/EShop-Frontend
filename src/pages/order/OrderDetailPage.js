//include OrderProduct Detail and Info Shipment
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrderItemList from '../../components/order/OrderItemList';
import InforShipment from '../../components/order/InforShipment';
import { Colors } from '../../styles/theme';
import { useParams } from 'react-router-dom';
import { fetchDataAxios } from '../../api/customAxios';

const OrderDetailPage = ({ idInp = null }) => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    id: 0,
    receiverName: '',
    totalPrice: 0,
    orderDate: null,
    shippingAddress: '',
    userId: 0,
    mobilePhone: '',
    status: 0,
    discountAmount: 0,
    couponId: 0,
    isPayed: false,
    paymentMethod: 0,
    coupon: null,
    itemsList: null,
    orderItems: [],
  });
  const fetchOrderById = async (id) => {
    try {
      const response = await fetchDataAxios({ url: `orders/${id}` });
      setOrder(response);
      console.log('Order', response);
    } catch (error) {
      console.log('Error when fetch data: ', error.message);
    }
  };
  useEffect(() => {
    console.log('Hehe');
    if (idInp != null) fetchOrderById(idInp);
    else fetchOrderById(id);
  }, []);
  return (
    <>
      <Typography
        textAlign={'center'}
        color={Colors.primary}
        variant='h5'
        fontWeight={'bold'}
        mt={2}
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
          <InforShipment order={order} />
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <OrderItemList order={order} />
        </Box>
      </Box>
    </>
  );
};

export default OrderDetailPage;
