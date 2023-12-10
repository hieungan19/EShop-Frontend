import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../../styles/theme';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <Card sx={{ maxWidth: 200, height: 280, mb: 2 }} onClick={handleCardClick}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          alt={product.name}
          height='140'
          image={product.imageUrl}
          sx={{ objectFit: 'cover' }}
        />
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
            display: product.currentCouponId > 0 ? 'block' : 'none',
            position: 'absolute',
            top: 2,
            right: 2,
            margin: '4px',
            fontWeight: 'bold',
          }}
        />
      </Box>

      <CardContent sx={{ padding: 1 }}>
        <Typography variant='body2' fontWeight={'bold'}>
          {product.name}
        </Typography>

        <Typography
          variant='caption'
          color='textSecondary'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Number of lines to show
          }}
        >
          {product.description}
        </Typography>
        <Typography
          variant='body2'
          sx={{ marginTop: 1, fontWeight: 'bold', color: Colors.secondary }}
        >
          {product.currentMaxPrice === product.currentMinPrice
            ? product.currentMaxPrice
            : `${product.currentMinPrice} - ${product.currentMaxPrice}`}
        </Typography>

        <Rating
          name='product-rating'
          value={product.averageStar}
          precision={0.5}
          readOnly
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
