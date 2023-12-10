import { Avatar, Box, Rating, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { formatDateTime } from '../../utils/FormatDateTime';

const Review = ({ review }) => {
  return (
    <Box
      key={review.id}
      sx={{ mb: 1, pb: 1, display: 'flex', alignItems: 'flex-start' }}
    >
      <Avatar
        src={review.avatar}
        alt={review.userName}
        sx={{ marginRight: 1 }}
      />
      <Box>
        <Typography variant='body2' color='textSecondary' sx={{ mb: 1, mt: 1 }}>
          <b>{review.userName}</b> - {formatDateTime(review.createdDate)}
        </Typography>
        <Rating value={review.star} readOnly />
        <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
          {review.detail}
        </Typography>
      </Box>
    </Box>
  );
};

export default Review;
