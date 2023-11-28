import React from 'react';
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

const OrderForm = () => {
  const [paymentMethod, setPaymentMethod] = React.useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
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
            autoFocus
          />
          <AddressForm />
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
              <MenuItem value='cash'>Tiền mặt</MenuItem>
              <MenuItem value='online'>Chuyển khoản trực tuyến</MenuItem>
            </Select>
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Order
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderForm;
