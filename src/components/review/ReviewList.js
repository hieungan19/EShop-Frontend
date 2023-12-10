import React from 'react';
import Review from './Review';
import { Box, Divider, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ReviewList = ({ reviews }) => {
  return (
    <Box sx={{ mt: 2, pt: 2 }}>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        Đánh giá
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Box>
  );
};

export default ReviewList;
