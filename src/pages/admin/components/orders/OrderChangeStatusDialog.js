import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
} from '@mui/material';
import OrderDetailPage from '../../../order/OrderDetailPage';
import { OrderStatus } from '../../../../utils/Constant';
import { putDataAxios } from '../../../../api/customAxios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/slice/authSlice';
import { toast } from 'react-toastify';

const OrderStatusChangeDialog = ({ open, onClose, order, fetchOrders }) => {
  const [newStatus, setNewStatus] = useState(0);
  const token = useSelector(selectUserToken);

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };
  useEffect(() => {
    setNewStatus(order.status);
  }, [order]);

  const handleSave = async () => {
    try {
      const response = await putDataAxios({
        url: `orders/${order.id}`,
        data: { status: newStatus },
        token: token,
      });
      toast.success('Cập nhật trạng thái đơn hàng thành công');
      fetchOrders();
    } catch (error) {
      toast.error('Cập nhật trạng thái đơn hàng thất bại');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Order Status</DialogTitle>

      <DialogContent>
        <OrderDetailPage idInp={order.id} />
        <Container sx={{ mt: 2 }}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={6}>
              <InputLabel>Trạng thái đơn hàng</InputLabel>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select value={newStatus} onChange={handleStatusChange}>
                  <MenuItem value={0}>{OrderStatus[0]}</MenuItem>
                  <MenuItem value={1}>{OrderStatus[1]}</MenuItem>
                  <MenuItem value={2}>{OrderStatus[2]}</MenuItem>
                  <MenuItem value={3}>{OrderStatus[3]}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary' variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderStatusChangeDialog;
