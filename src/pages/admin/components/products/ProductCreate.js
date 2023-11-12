import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import {
  putDataAxios,
  fetchDataAxios,
  deleteDataAxios,
  postDataAxios,
} from '../../../../api/customAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Axios from 'axios';
import { storage } from '../../../../firebase/config';
import styles from './AddProduct.module.scss';

const categories = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Phone' },
];

const initialState = {
  name: '',
  imageURL: '',
  categoryID: '',
  price: 0,
  desc: '',
  options: [{ name: '', price: 0, quantity: 0 }],
};

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ ...initialState });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (id !== 'add') {
      fetchData(); // Fetch product details for editing
    }
  }, [id]);

  async function fetchData() {
    try {
      const response = await fetchDataAxios(`products/${id}`); // Replace with your API endpoint
      const productData = response.data;
      setProduct(detectForm(id, { ...initialState }, productData));
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  function detectForm(id, f1, f2) {
    return id === 'add' ? f1 : f2;
  }

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

    // Create a FileReader
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the result of the FileReader as the preview image
      setPreviewImage(reader.result);
    };

    if (file) {
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success('Image uploaded successfully.');
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await (id === 'ADD'
        ? postDataAxios({ url: '/api/products', data: product }) // Replace with your API endpoint
        : putDataAxios({ url: `products/${id}`, data: product })); // Replace with your API endpoint

      setIsLoading(false);
      setUploadProgress(0);
      setSnackbarMessage(response.data.message);
      setOpenSnackbar(true);

      if (id === 'ADD') {
        setProduct({ ...initialState });
      }

      setTimeout(() => {
        navigate('/admin/all-products');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ marginTop: '10px', marginRight: '10px' }}>
      {isLoading && <CircularProgress />}
      <div>
        <h2>{detectForm(id, 'Add New Product', 'Edit Product')}</h2>
        <Card className={styles.card}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Product Category
                  </InputLabel>
                  <Select
                    required
                    name='categoryID'
                    value={product.categoryID}
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
                <TextField
                  type='number'
                  label='Product price'
                  fullWidth
                  required
                  name='price'
                  value={product.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Product Company/Brand'
                  fullWidth
                  required
                  name='brand'
                  value={product.brand}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Product image</InputLabel>
                <Input
                  type='file'
                  accept='image/*'
                  name='image'
                  onChange={handleImageChange}
                />
                {/* {uploadProgress > 0 && (
                  <div className={styles.progress}>
                    <div
                      className={styles['progress-bar']}
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}%`
                        : `Upload Complete ${uploadProgress}%`}
                    </div>
                  </div>
                )}
                {product.imageURL !== '' && (
                  <TextField
                    type='text'
                    placeholder='Image URL'
                    name='imageURL'
                    value={product.imageURL}
                    fullWidth
                    disabled
                  />
                )} */}
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
              <Grid item xs={12}>
                <TextareaAutosize
                  rowsMin={4}
                  placeholder='Product Description'
                  name='desc'
                  required
                  value={product.desc}
                  onChange={handleInputChange}
                  sx={{ width: '100%', minHeight: '5rem' }}
                />
              </Grid>
              <Grid item>
                <InputLabel>Product Options</InputLabel>
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
                      sx={{ marginBottom: '8px' }}
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
                      sx={{ marginBottom: '8px' }}
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
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isLoading}
                  style={{ marginTop: '16px' }}
                >
                  {detectForm(id, 'Save Product', 'Edit Product')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default AddProduct;
