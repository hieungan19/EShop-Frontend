import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  fetchDataAxios,
  postDataAxios,
  putDataAxios,
} from '../../../../api/customAxios';
import { storage } from '../../../../firebase/config';
import { Colors } from '../../../../style/theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  STORE_CATEGORIES,
  selectCategories,
} from '../../../../redux/slice/categorySlice';
import axios from 'axios';
import { fetchCategories } from '../categories/Categories';

const StyledProductTitle = styled(Typography)(({}) => ({
  color: Colors.black,
  variant: 'body2',
  fontWeight: '500',
}));

const StyledTextField = styled(TextField)`
  textarea {
    resize: both;
  }
`;

const initialState = {
  name: '',
  imageURL: '',
  categoryId: '',
  description: '',
  options: [{ name: '', price: 0, quantity: 0 }],
};

const ProductFormDialog = ({
  productId = '',
  open,
  handleCloseDialog,
  fetchProductsAndDispatch,
}) => {
  const [product, setProduct] = useState({ ...initialState });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState(useSelector(selectCategories));
  const [previewImage, setPreviewImage] = useState('');
  const dispatch = useDispatch();

  const fetchCategoriesAndDispatch = async () => {
    const response = await fetchCategories();
    if (response) {
      setCategories(response.categories);
      dispatch(STORE_CATEGORIES({ categories: response.categories }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (categories.length === 0) {
        await fetchCategoriesAndDispatch();
      }
      if (productId !== '') {
        await fetchProduct();
      }
    };

    fetchData();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetchDataAxios({ url: `products/${productId}` });
      setProduct(detectForm(productId, { ...initialState }, response));
      setPreviewImage(response.imageUrl);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const detectForm = (id, f1, f2) => {
    return id === '' ? f1 : f2;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...product.options];
    updatedOptions[index][field] = value;
    setProduct({ ...product, options: updatedOptions });
  };

  const addOption = () => {
    setProduct({
      ...product,
      options: [...product.options, { name: '', price: 0, quantity: 0 }],
    });
  };

  const removeOption = (index) => {
    const updatedOptions = [...product.options];
    updatedOptions.splice(index, 1);
    setProduct({ ...product, options: updatedOptions });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
          toast.error(error.message);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setProduct({ ...product, imageUrl: downloadURL });
            resolve(downloadURL);
          } catch (error) {
            console.log(error);
            toast.error(error.message);
            reject(error);
          }
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const downloadURL = await handleImageUpload(image);
      const response = await (productId === ''
        ? postDataAxios({
            url: 'products',
            data: { ...product, imageUrl: downloadURL },
          })
        : putDataAxios({
            url: `products/${productId}`,
            data: { ...product, imageUrl: downloadURL },
          }));

      setIsLoading(false);
      setUploadProgress(0);

      if (!productId) {
        setProduct({ ...initialState });
      }
      toast.success(
        `${productId === '' ? 'Created' : 'Updated'} product successfully!`
      );
      await fetchProductsAndDispatch();
      handleCloseDialog();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth='md' fullWidth>
      <DialogTitle
        textAlign={'center'}
        fontWeight={'bold'}
        textTransform={'uppercase'}
      >
        {detectForm(productId, 'Add New Product', 'Edit Product')}
      </DialogTitle>
      <DialogContent>
        <Card>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: '8px' }}>
              <Grid item xs={12}>
                <TextField
                  label='Product name'
                  fullWidth
                  required
                  name='name'
                  value={product.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  id='outlined-textarea'
                  label='Description'
                  placeholder=' Product Description'
                  name='description'
                  multiline
                  minRows={3}
                  variant='outlined'
                  value={product.description}
                  onChange={handleInputChange}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Product Category</InputLabel>
                  <Select
                    required
                    name='categoryId'
                    value={product.categoryId}
                    onChange={handleInputChange}
                  >
                    <MenuItem value='' disabled>
                      -- Choose product category --
                    </MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <InputLabel>
                  <StyledProductTitle>Product Image</StyledProductTitle>
                </InputLabel>
                <Input
                  type='file'
                  accept='image/*'
                  name='image'
                  onChange={handleImageChange}
                />

                {previewImage && (
                  <div
                    style={{
                      width: '200px',
                      height: '200px',
                      overflow: 'hidden',
                      marginTop: '10px',
                    }}
                  >
                    <img
                      src={previewImage}
                      alt='Preview'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
              </Grid>

              <Grid item>
                <InputLabel>
                  <StyledProductTitle>Product Options</StyledProductTitle>
                </InputLabel>
                {product.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <TextField
                      label='Option name'
                      fullWidth
                      required
                      value={option.name}
                      onChange={(e) =>
                        handleOptionChange(index, 'name', e.target.value)
                      }
                      sx={{ marginBottom: '12px' }}
                    />
                    <TextField
                      type='number'
                      label='Option price'
                      fullWidth
                      required
                      value={option.price}
                      onChange={(e) =>
                        handleOptionChange(index, 'price', e.target.value)
                      }
                      sx={{ marginBottom: '12px' }}
                    />
                    <TextField
                      type='number'
                      label='Option quantity'
                      fullWidth
                      required
                      value={option.quantity}
                      onChange={(e) =>
                        handleOptionChange(index, 'quantity', e.target.value)
                      }
                      sx={{ marginBottom: '8px' }}
                    />
                    <Button
                      variant='outlined'
                      onClick={() => removeOption(index)}
                      style={{ marginTop: '8px' }}
                    >
                      Remove Option
                    </Button>
                  </div>
                ))}
                <Button
                  variant='outlined'
                  onClick={addOption}
                  style={{ marginTop: '16px' }}
                >
                  Add Option
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={isLoading}
          style={{ marginTop: '16px' }}
          onClick={handleSubmit}
        >
          {isLoading ? <CircularProgress /> : 'SAVE PRODUCT'}
        </Button>

        <Button
          variant='contained'
          color='secondary'
          disabled={isLoading}
          style={{ marginTop: '16px' }}
          onClick={handleCloseDialog}
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
