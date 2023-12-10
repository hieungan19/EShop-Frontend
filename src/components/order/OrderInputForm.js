import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddressForm from './AddressForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  RESET_SELECTED_ITEMS,
  STORE_ITEMS_TO_CART,
  selectAddress,
  selectCouponId,
  selectSelectedItems,
} from '../../redux/slice/cartSlice';
import { selectUserId, selectUserToken } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import { fetchDataAxios, postDataAxios } from '../../api/customAxios';
import { useNavigate } from 'react-router-dom';
const OrderForm = () => {
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiverName, setReceiverName] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const [userAddress, setUserAddress] = useState([]);

  const items = useSelector(selectSelectedItems);
  const couponId = useSelector(selectCouponId);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const shippingAddress = userAddress.join(', ');
    const itemsList = items.map((i) => ({ id: i.id, quantity: i.quantity }));
    const mobilePhone = phoneNumber;

    const data = {
      shippingAddress,
      itemsList,
      receiverName,
      userId,
      mobilePhone,
      paymentMethod,
      couponId,
    };

    try {
      const response = await postDataAxios({
        url: 'orders',
        data: data,
        token: token,
      });
      if (paymentMethod === 1) {
        const paymentResponse = await fetchDataAxios({
          url: `payment/${response.id}`,
        });

        window.open(paymentResponse.payUrl, '_blank');
      }
      toast.success('Đặt hàng thành công.');
      navigate('/');
      dispatch(RESET_SELECTED_ITEMS());
      const cartItems = await fetchDataAxios({
        url: `carts/${userId}`,
        token: token,
      });
      dispatch(STORE_ITEMS_TO_CART({ cartItems: cartItems.options }));
    } catch (error) {
      toast.error('Failed Order');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Điền thông tin người nhận
        </Typography>
        <Box component='form' noValidate sx={{ mt: 3 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='receiverName'
            label='Người nhận'
            name='receiverName'
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            autoFocus
          />
          <TextField
            label='Phone Number'
            fullWidth
            margin='normal'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ''))}
            inputProps={{ maxLength: 10 }}
          />
          <AddressForm
            userAddress={userAddress}
            setUserAddress={setUserAddress}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id='paymentMethodLabel'>
              Phương thức thanh toán
            </InputLabel>
            <Select
              labelId='paymentMethodLabel'
              id='paymentMethod'
              value={paymentMethod}
              label='Phương thức thanh toán'
              onChange={handlePaymentMethodChange}
            >
              <MenuItem value={0}>SHIP COD</MenuItem>
              <MenuItem value={1}>Chuyển khoản Momo</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={handleSubmitOrder}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Đặt hàng
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderForm;
