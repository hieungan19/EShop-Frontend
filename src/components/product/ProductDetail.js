import { Box, Button, Chip, Container, Grid, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import React, { useState } from 'react';
import { Colors } from '../../styles/theme';
import ReviewList from '../review/ReviewList';
import StyleInputNumberButton from '../style-component/StyleInputNumberButton';

const ProductDetail = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);

  //handle quantity
  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Sample product data (replace it with your actual product data)
  const product = {
    id: 1,
    name: 'Product Name',
    maxPrice: 50000,
    minPrice: 10000,
    description: 'Product description goes here.',
    category: 'Electronics',
    image: 'https://placekitten.com/200/300', // Replace with the actual image URL
    options: [
      { id: 1, name: 'Option 1', price: 2.99 },
      { id: 2, name: 'Option 2', price: 4.99 },
      // Add more options as needed
    ],
    reviews: [
      {
        id: 1,
        rating: 4,
        review: 'Great product!',
        user: { id: 1, name: 'John Doe', avatar: 'user1_avatar_url.jpg' },
        createdAt: new Date('2023-01-15T12:30:00'), // Replace with actual datetime
      },
      {
        id: 2,
        rating: 5,
        review: 'Excellent quality.',
        user: { id: 2, name: 'Jane Smith', avatar: 'user2_avatar_url.jpg' },
        createdAt: new Date('2023-01-16T10:45:00'), // Replace with actual datetime
      },
      // Add more reviews as needed
    ],
  };
  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    // Handle adding the product to the cart (dispatch an action or call an API)
    console.log('Product added to cart:', {
      ...product,
      selectedOption,
      quantity,
    });
  };

  const averageRating =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length;

  return (
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
              alignItems: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            />
          </Grid>

          {/* Right Section - Product Details, Options, and Reviews */}
          <Grid item xs={12} md={6}>
            <Box>
              <Box>
                {/* Product Name and Price */}

                <Typography variant='h5'>
                  {product.name}{' '}
                  <Chip
                    label={`- 30%`}
                    color='secondary'
                    size='small'
                    sx={{ fontWeight: 'bold' }}
                  />
                </Typography>
                <Typography
                  variant='h6'
                  fontWeight={'bold'}
                  color={Colors.secondary}
                >
                  {product.minPrice !== product.maxPrice
                    ? `${product.minPrice.toLocaleString()} - ${product.maxPrice.toLocaleString()}`
                    : `${product.minPrice.toLocaleString()}`}{' '}
                  đ
                </Typography>
                <Typography variant='body2' color='textSecondary' mt={1}>
                  Category: {product.category}
                </Typography>
                <Box display={'flex'} alignItems={'flex-end'}>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    sx={{ mt: 2 }}
                  >
                    Average Rating:
                  </Typography>
                  <Rating value={averageRating} readOnly />
                </Box>

                {/* Product Description, Category */}
                <Typography variant='body1' mt={2}>
                  {product.description}
                </Typography>

                {/* Options */}
                <Box sx={{ my: 2, display: 'flex', gap: 1 }}>
                  {product.options.map((option) => (
                    <Button
                      key={option.id}
                      variant={
                        selectedOption === option.id ? 'contained' : 'outlined'
                      }
                      onClick={() => handleOptionChange(option.id)}
                    >
                      {option.name} - ${option.price.toFixed(2)}
                    </Button>
                  ))}
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
                    variant='body2'
                    color='textSecondary'
                    sx={{ mt: 1 }}
                  >
                    Option Price: $
                    {product.options
                      .find((o) => o.id === selectedOption)
                      .price.toFixed(2)}{' '}
                    | Total Price: $
                    {(
                      product.options.find((o) => o.id === selectedOption)
                        .price * quantity
                    ).toFixed(2)}
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
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Grid item xs={12} md={12}>
        {/* Reviews Section */}
        <Container sx={{ width: '100%', backgroundColor: Colors.white }}>
          <ReviewList product={product} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
