import React from 'react';
import Review from './Review';
import { Box, Typography } from '@mui/material';

const ReviewList = ({ product }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Customer Reviews
      </Typography>
      {product.reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Box>
  );
};

export default ReviewList;
