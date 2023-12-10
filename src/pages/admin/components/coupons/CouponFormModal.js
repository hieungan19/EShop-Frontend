import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import { StyledTextField } from '../products/ProductFormDialog';
import { postDataAxios } from '../../../../api/customAxios';
import { toast } from 'react-toastify';
import { fetchALlCoupons } from './Coupons';
import { STORE_COUPONS } from '../../../../redux/slice/couponSlice';
import { useDispatch } from 'react-redux';
const couponInitData = {
  id: null,
  name: '',
  desciption: '',
  applyCouponType: 0,
  discountPercent: null,
  discountAmount: null,
  maxDiscountAmount: null,
  minBillAmount: null,
  startDate: '',
  endDate: '',
};
const CouponForm = ({ open, onClose, setCoupons }) => {
  const [formData, setFormData] = useState(couponInitData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'discountAmount') {
      setFormData({
        ...formData,
        discountAmount: value,
        discountPercent: null,
      });
    } else if (name === 'discountPercent') {
      setFormData({
        ...formData,
        discountAmount: null,
        discountPercent: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await postDataAxios({ url: 'coupons', data: formData });
      const responseCoupons = await fetchALlCoupons();
      if (responseCoupons) {
        setCoupons(responseCoupons.coupons);
        dispatch(STORE_COUPONS({ coupons: response.coupons }));
      }
      setFormData(couponInitData);
      onClose();
    } catch (error) {
      toast.error('Thất bại');
    }
  };

  const handleClose = () => {
    setFormData(couponInitData);
    onClose();
  };

  const showAdditionalFields = formData.applyCouponType === 0;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Coupon Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor='name'>Tên mã giảm giá</InputLabel>
              <TextField
                fullWidth
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='description'>Mô tả</InputLabel>
              <StyledTextField
                id='desciption'
                placeholder='Product Description'
                name='desciption'
                multiline
                minRows={3}
                fullWidth
                variant='outlined'
                onChange={handleChange}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='applyCouponType'>Loại giảm giá</InputLabel>
              <RadioGroup
                name='applyCouponType'
                value={formData.applyCouponType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label='Hóa đơn'
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label='Sản phẩm'
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='discountAmount'>Số tiền giảm</InputLabel>
              <TextField
                fullWidth
                id='discountAmount'
                name='discountAmount'
                type='number'
                value={formData.discountAmount || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='discountPercent'>
                Phần trăm giảm giá
              </InputLabel>
              <TextField
                fullWidth
                id='discountPercent'
                name='discountPercent'
                type='number'
                value={formData.discountPercent || ''}
                onChange={handleChange}
              />
            </Grid>
            {showAdditionalFields && (
              <>
                <Grid item xs={12}>
                  <InputLabel htmlFor='maxDiscountAmount'>
                    Max Discount Amount
                  </InputLabel>
                  <TextField
                    fullWidth
                    id='maxDiscountAmount'
                    name='maxDiscountAmount'
                    type='number'
                    value={formData.maxDiscountAmount || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor='minBillAmount'>
                    Hóa đơn tối thiểu
                  </InputLabel>
                  <TextField
                    fullWidth
                    id='minBillAmount'
                    name='minBillAmount'
                    type='number'
                    value={formData.minBillAmount || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <InputLabel htmlFor='startDate'>Bắt đầu</InputLabel>
              <TextField
                fullWidth
                id='startDate'
                name='startDate'
                type='datetime-local'
                value={formData.startDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='endDate'>Kết thúc</InputLabel>
              <TextField
                fullWidth
                id='endDate'
                name='endDate'
                type='datetime-local'
                value={formData.endDate}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Submit
        </Button>
        <Button onClick={handleClose} variant='contained' color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CouponForm;
