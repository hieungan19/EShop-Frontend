import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Rating,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Colors } from '../../styles/theme';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const image = 'https://placekitten.com/200/300';

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      sx={{ maxWidth: '300px', backgroundColor: Colors.white, mb: 2, pb: 2 }}
    >
      <Grid container spacing={2} alignItems='center'>
        <Grid item>
          <Avatar />
        </Grid>
        <Grid item>
          <Typography variant='subtitle1'>User Name</Typography>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <CardMedia
              component='img'
              alt={'Product Name'}
              sx={{ height: '60px', width: '60px', objectFit: 'cover' }}
              image={image}
            />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>Product Name</Typography>
            <Typography variant='body2' color='textSecondary'>
              Option: Option Name
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Rating</FormLabel>
          <Rating
            name='rating'
            value={rating}
            precision={1}
            onChange={handleRatingChange}
          />
        </FormControl>
      </Box>

      <Box mt={2}>
        <TextField
          label='Write your review'
          multiline
          rows={4}
          variant='outlined'
          fullWidth
          value={reviewText}
          onChange={handleReviewTextChange}
        />
      </Box>

      <Box mt={2}>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message='Review submitted successfully!'
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </Container>
  );
};

export default ReviewForm;
