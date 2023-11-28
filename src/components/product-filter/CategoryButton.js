import React, { useState } from 'react';
import { Button } from '@mui/material';

const CategoryButton = ({ cat, filterProducts, activeCategory }) => {
  return (
    <Button
      variant='text'
      onClick={() => {
        filterProducts(cat);
      }}
      sx={{
        paddingLeft: activeCategory === cat ? '16px' : '0',
        transition: 'padding 0.3s ease', // Add a smooth transition effect
      }}
    >
      &#8250; {cat}
    </Button>
  );
};

export default CategoryButton;
