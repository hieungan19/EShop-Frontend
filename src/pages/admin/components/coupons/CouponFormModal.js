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
import { StyledTextField } from '../products/ProductFormDialog';

const CouponForm = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      id: null,
      name: '',
      description: '',
      applyCouponType: '0',
      discountPercent: 0,
      discountAmount: null,
      maxDiscountAmount: null,
      minBillAmount: null,
      startDate: '',
      endDate: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Chỉ cho phép điền một trong hai trường discountAmount hoặc discountPercent
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

  const handleSubmit = () => {
    // Gọi hàm onSubmit để xử lý dữ liệu khi người dùng submit
    onSubmit(formData);
    onClose(); // Đóng dialog sau khi submit
  };

  const handleClose = () => {
    setFormData(initialData || {}); // Reset form data khi đóng dialog
    onClose();
  };

  const showAdditionalFields = formData.applyCouponType === '0';

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Coupon Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                id='outlined-textarea'
                label='Description'
                placeholder='Product Description'
                name='description'
                multiline
                minRows={3}
                variant='outlined'
                onChange={handleChange}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                name='applyCouponType'
                value={formData.applyCouponType}
                onChange={handleChange}
              >
                <FormControlLabel value='0' control={<Radio />} label='Bill' />
                <FormControlLabel
                  value='1'
                  control={<Radio />}
                  label='Product'
                />
              </RadioGroup>
            </Grid>
            {/* Các trường khác ... */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Discount Amount'
                name='discountAmount'
                type='number'
                value={formData.discountAmount || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Discount Percent'
                name='discountPercent'
                type='number'
                value={formData.discountPercent || ''}
                onChange={handleChange}
              />
            </Grid>
            {showAdditionalFields && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Max Discount Amount'
                    name='maxDiscountAmount'
                    type='number'
                    value={formData.maxDiscountAmount || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Min Bill Amount'
                    name='minBillAmount'
                    type='number'
                    value={formData.minBillAmount || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Start Date'
                name='startDate'
                type='datetime-local'
                value={formData.startDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='End Date'
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
