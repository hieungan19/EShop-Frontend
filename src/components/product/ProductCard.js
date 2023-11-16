import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Colors } from '../../styles/theme';

const ProductCard = ({
  name,
  description,
  price,
  imageURL,
  inStock,
  rating,
  numReviews,
}) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          alt={name}
          height='140'
          image={imageURL}
          sx={{ objectFit: 'cover' }}
        />
        <Chip
          label={`-30%`}
          color='secondary'
          size='small'
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            margin: '4px',
            fontWeight: 'bold',
          }}
        />
      </Box>

      <CardContent>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant='h6' component='div'>
            {name}
          </Typography>
          <Box>
            {inStock ? (
              <Chip
                label='In Stock'
                variant='outlined'
                sx={{ color: Colors.primary, marginRight: 1 }}
              />
            ) : (
              <Chip
                label='Out of Stock'
                variant='outlined'
                sx={{ color: Colors.secondary, marginRight: 1 }}
              />
            )}
          </Box>
        </Box>
        <Typography
          variant='body2'
          color='textSecondary'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Number of lines to show
          }}
        >
          {description}
        </Typography>
        <Typography variant='body1' sx={{ marginTop: 1, fontWeight: 'bold' }}>
          Price: ${price}
        </Typography>

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Rating
            name='product-rating'
            value={rating}
            precision={0.5}
            readOnly
          />
          <Typography variant='body2' color='textSecondary'>
            {`(${numReviews} reviews)`}
          </Typography>
        </Box>
        <Button
          sx={{ width: '100%' }}
          variant='contained'
          color='primary'
          startIcon={<ShoppingCartIcon />}
          disabled={!inStock}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
