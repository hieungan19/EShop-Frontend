import CouponIcon from '@mui/icons-material/Discount';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAxios } from '../../api/customAxios';
import CartItemRow from '../../components/cart/CartItem';
import StyleTableHeader from '../../components/style-component/StyleTableHeader';
import {
  REMOVE_SELECTED_ITEM,
  SELECT_ITEM,
  selectCartItems,
} from '../../redux/slice/cartSlice';
import { Colors } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [totalBill, setTotalBill] = useState(0); // Thành tiền
  const [realTotalBill, setRealTotalBill] = useState(0); // Tổng thanh toán
  const [coupons, setCoupons] = useState([]); // bill coupon base on total bill

  useEffect(() => {
    fetchBillCoupon();
    setRealTotalBill(totalBill);
  }, [totalBill]);

  const fetchBillCoupon = async () => {
    console.log(totalBill);
    try {
      const response = await fetchDataAxios({
        url: `coupons/bill/${totalBill}`,
      });
      setCoupons(response.coupons);
      console.log(response.coupons);
    } catch (error) {
      console.log('Fetch coupon failed.');
    }
  };

  const handleSelectItem = ({ item, isChecked, quantity }) => {
    console.log(item, isChecked, quantity);
    if (isChecked === true) {
      dispatch(SELECT_ITEM({ item: { ...item, quantity: quantity } }));
      setTotalBill((preValue) => preValue + item.currentPrice * quantity);
    } else {
      dispatch(REMOVE_SELECTED_ITEM({ item: item }));
      setTotalBill((preValue) => preValue - item.currentPrice * quantity);
    }
  };

  const applyCoupon = (coupon) => {
    let discount = 0;

    if (coupon.discountPercent !== null) {
      discount = (totalBill * coupon.discountPercent) / 100;
    } else {
      discount = coupon.discountAmount;
    }

    if (coupon.maxDiscountAmount != null) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
    setRealTotalBill(totalBill - discount);
  };

  const handleSelectCoupon = (event) => {
    setSelectedCoupon(event.target.value);
    applyCoupon(event.target.value);
  };

  return (
    <Box>
      <Container
        sx={{
          backgroundColor: Colors.white,
          mb: 4,
          mt: 2,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' fontWeight={'bold'}>
          YOUR CART{' '}
        </Typography>
        <TextField
          label='Search Categories'
          variant='outlined'
          fullWidth
          margin='normal'
          // value={searchTerm}
          // onChange={handleSearchChange}
          sx={{ m: 0, p: 0, width: '50%' }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Container>
      <Container sx={{ backgroundColor: Colors.white }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyleTableHeader>
                  <Checkbox disabled={true}></Checkbox>
                </StyleTableHeader>
                <StyleTableHeader>Image</StyleTableHeader>
                <StyleTableHeader>Product Name</StyleTableHeader>
                <StyleTableHeader>Option Name</StyleTableHeader>
                <StyleTableHeader>Quantity</StyleTableHeader>
                <StyleTableHeader>Price</StyleTableHeader>
                <StyleTableHeader>Action</StyleTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((i) => (
                <CartItemRow key={i.id} item={i} onSelect={handleSelectItem} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        <Container
          sx={{ backgroundColor: Colors.white, paddingBottom: '18px' }}
        >
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            mr={4}
            my={2}
            alignItems={'center'}
          >
            <CouponIcon color='secondary' sx={{ mr: 2 }} />
            <Typography>Select Coupon</Typography>

            <FormControl sx={{ width: '250px', marginLeft: 2 }}>
              <InputLabel id='coupon-select-label'>Select Coupon</InputLabel>
              <Select
                labelId='coupon-select-label'
                id='coupon-select'
                value={selectedCoupon}
                onChange={handleSelectCoupon}
                label='Select Coupon'
              >
                {coupons.map((coupon) => (
                  <MenuItem key={coupon.id} value={coupon}>
                    {coupon.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mr={4}>
            <Typography variant='h6'>Thành tiền: </Typography>
            <Typography variant='h6'>
              &nbsp; {totalBill.toLocaleString()}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mr={4}>
            <Typography variant='h6'>Tổng thanh toán: </Typography>
            <Typography
              variant='h6'
              color={Colors.secondary}
              fontWeight={'bold'}
            >
              &nbsp; {realTotalBill.toLocaleString()}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mr={4}>
            <Button
              onClick={() => {
                navigate('/create-order');
              }}
              variant='contained'
              sx={{
                fontSize: '16px',
                wordSpacing: '2px',
                letterSpacing: '2px',
              }}
            >
              Đặt hàng
            </Button>
          </Box>
        </Container>
      </div>
    </Box>
  );
};

export default CartPage;
