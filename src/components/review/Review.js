import { Avatar, Box, Rating, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';

const Review = ({ review }) => {
  return (
    <Box
      key={review.id}
      sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}
    >
      <Avatar
        src={review.user.avatar}
        alt={review.user.name}
        sx={{ marginRight: 1 }}
      />
      <Box>
        <Typography variant='body2' color='textSecondary' sx={{ mb: 1, mt: 1 }}>
          {review.user.name} - {format(review.createdAt, 'MMMM dd, yyyy HH:mm')}
        </Typography>
        <Rating value={review.rating} readOnly />
        <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
          {review.review}
        </Typography>
      </Box>
    </Box>
  );
};

export default Review;
