import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../styles/theme';
import ReviewList from '../review/ReviewList';
import StyleInputNumberButton from '../style-component/StyleInputNumberButton';
import { fetchDataAxios, postDataAxios } from '../../api/customAxios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserToken } from '../../redux/slice/authSlice';
import { STORE_ITEMS_TO_CART } from '../../redux/slice/cartSlice';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [averageStar, setAverageStar] = useState(0);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();

  const policyText = 'CHÍNH SÁCH ĐỔI TRẢ SẢN PHẨM KHI MUA HÀNG TẠI LÀ MỨT';

  const fetchProductById = async () => {
    try {
      setIsLoading(true);
      console.log('Fetch');
      const response = await fetchDataAxios({ url: `products/${id}` });

      setProduct(response);
      setAverageStar(response.averageStar);
      setIsLoading(false);
    } catch (error) {
      toast.error('Fetch product failed.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  //handle quantity
  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const getPrice = (option) => {
    let temp = option.price;
    if (product.currentCouponId !== null) {
      if (product.currentCoupon.discountPercent) {
        temp =
          (option.price * (100 - product.currentCoupon.discountPercent)) / 100;
      } else {
        temp = option.price - product.currentCoupon.discountAmount;
      }
    }
    return temp;
  };

  const handleAddToCart = async () => {
    const data = {
      userId,
      optionId: selectedOption,
      quantity,
    };
    console.log(data);
    try {
      const response = await postDataAxios({
        url: 'carts',
        token: token,
        data: data,
      });
      const cartItems = await fetchDataAxios({
        url: `carts/${userId}`,
        token: token,
      });
      dispatch(STORE_ITEMS_TO_CART({ cartItems: cartItems.options }));

      toast.success('Thêm vào giỏ hàng thành công. ');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={2} mt={1}>
      {/* Left Section - Product Image */}
      <Container sx={{ width: '100%', backgroundColor: Colors.white }}>
        <Grid container spacing={2} mt={1} mb={2} sx={{ pl: 2 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Zoom>
              <img
                alt='That Wanaka Tree, New Zealand by Laura Smetsers'
                src={product.imageUrl}
                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
              />
            </Zoom>
          </Grid>

          {/* Right Section - Product Details, Options, and Reviews */}
          <Grid item xs={12} md={6}>
            <Box>
              <Box>
                {/* Product Name and Price */}

                <Typography variant='h5'>
                  {product.name}{' '}
                  <Chip
                    label={
                      product.currentCoupon
                        ? `-${product.currentCoupon.discountPercent}%` ??
                          `$-${product.currentCoupon.discountAmount}đ`
                        : null
                    }
                    color='secondary'
                    size='small'
                    sx={{
                      display: product.currentCouponId > 0 ? 'inline' : 'none',
                      fontWeight: 'bold',
                      padding: 1,
                    }}
                  />
                </Typography>
                <Typography
                  variant='h6'
                  fontWeight={'bold'}
                  color={Colors.secondary}
                >
                  {product.minPrice !== product.maxPrice
                    ? `${product.currentMinPrice} - ${product.currentMaxPrice}`
                    : `${product.currentMinPrice}`}{' '}
                  đ
                </Typography>
                {product.currentCoupon != null ? (
                  <Typography
                    sx={{ textDecoration: 'line-through' }}
                    variant='body2'
                    color={Colors.dim_gray}
                  >
                    {product.minPrice !== product.maxPrice
                      ? `${product.minPrice} - ${product.maxPrice}`
                      : `${product.minPrice}`}{' '}
                    đ
                  </Typography>
                ) : null}
                {/* <Typography variant='body2' color='textSecondary' mt={1}>
                  Category: {product.category.name}
                </Typography> */}
                <Box display={'flex'} alignItems={'flex-end'}>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    sx={{ mt: 2 }}
                  >
                    Average Rating:
                  </Typography>
                  <Rating value={averageStar} readOnly />
                </Box>

                {/* Options */}
                <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                  {product.options
                    ? product.options.map((option) => {
                        return (
                          <Button
                            key={option.id}
                            variant={
                              selectedOption === option.id
                                ? 'contained'
                                : 'outlined'
                            }
                            onClick={() => handleOptionChange(option.id)}
                          >
                            {option.name}
                          </Button>
                        );
                      })
                    : null}
                </Box>
                {/* Quantity */}
                <StyleInputNumberButton
                  handleChange={handleQuantityChange}
                  handleDecrease={handleQuantityDecrease}
                  handleIncrease={handleQuantityIncrease}
                  data={quantity}
                />

                {/* Price of the selected option and total price */}
                {selectedOption && (
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    sx={{ mt: 1 }}
                  >
                    <b>
                      Giá:
                      {product.options
                        ? getPrice(
                            product.options.find((o) => o.id === selectedOption)
                          ).toFixed(2)
                        : null}{' '}
                    </b>
                    | Tổng cộng:
                    {product.options
                      ? (
                          getPrice(
                            product.options.find((o) => o.id === selectedOption)
                          ) * quantity
                        ).toFixed(2)
                      : null}
                  </Typography>
                )}

                {/* Add to Cart Button */}
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleAddToCart}
                  disabled={!selectedOption}
                  sx={{ mt: 2 }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Product Description, Category */}
        <Box pl={2}>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
            Mô tả sản phẩm
          </Typography>
          <Typography variant='body1' mt={2}>
            {product.description?.split('.').map((sentence, index) => {
              const trimmedSentence = sentence.trim();
              return (
                <React.Fragment key={index}>
                  {trimmedSentence.includes(policyText) ? (
                    <React.Fragment>
                      <strong>{trimmedSentence}</strong>
                      <br />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {trimmedSentence}
                      <br />
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            })}
          </Typography>
        </Box>
      </Container>

      {/* Reviews Section */}
      <Grid item xs={12} md={12}>
        <Container sx={{ width: '100%', backgroundColor: Colors.white }}>
          {product.reviews && product.reviews.length != 0 ? (
            <ReviewList reviews={product.reviews} />
          ) : null}
        </Container>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
