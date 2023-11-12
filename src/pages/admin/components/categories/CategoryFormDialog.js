import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { postDataAxios, putDataAxios } from '../../../../api/customAxios';
import { selectUserToken } from '../../../../redux/slice/authSlice';
const CategoryFormDialog = ({
  open,
  onClose,
  category,
  isUpdate,
  fetchData,
}) => {
  const [formData, setFormData] = useState(category);
  const token = useSelector(selectUserToken);
  useEffect(() => {
    setFormData(category);
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await postDataAxios({
        url: 'categories',
        data: { name: formData.name },
        token: token,
      });
      console.log(response);
      // Inside handleUpdate function
      //dispatch(ADD_CATEGORY({ category: response }));
      toast.success('Category created successfully.');
      fetchData();

      onClose();
    } catch (error) {
      toast.error('Error creating category.');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await putDataAxios({
        url: `categories/${category.id}`,
        data: { name: formData.name },
        token: token,
      });
      //dispatch(UPDATE_CATEGORY({ category: response }));

      toast.success('Category updated successfully.');
      fetchData();
      onClose();
    } catch (error) {
      toast.error('Error updating category.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isUpdate ? 'Update Category' : 'Create Category'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label='Category Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={isUpdate ? handleUpdate : handleCreate}
          color='primary'
        >
          {isUpdate ? 'Update' : 'Create'}
        </Button>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormDialog;
