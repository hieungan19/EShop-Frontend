import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Colors } from '../../styles/theme';
import ReviewForm from '../../components/review/ReviewForm';

const ReviewPage = ({ items }) => {
  const { state } = useLocation();
  console.log(state.items);

  return (
    <Box>
      <Container
        sx={{
          backgroundColor: Colors.white,
          mb: 4,
          mt: 2,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' fontWeight={'bold'}>
          ĐÁNH GIÁ{' '}
        </Typography>
      </Container>

      {state.items
        ? state.items.map((i, index) => <ReviewForm key={index} item={i} />)
        : null}
    </Box>
  );
};

export default ReviewPage;
