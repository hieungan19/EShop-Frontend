import React from 'react';
import StyleTinyButton from './StyleTinyButton';
import { Box, TextField } from '@mui/material';

const StyleInputNumberButton = ({
  data,
  handleChange,
  handleDecrease,
  handleIncrease,
}) => {
  return (
    <Box
      sx={{
        '& button': { m: 1, p: 0 },
        display: 'flex',
        alignItems: 'center',
        my: 2,
      }}
    >
      <StyleTinyButton onClickBtn={handleDecrease} text={'-'} />
      <TextField
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        type='number'
        value={data}
        onChange={handleChange}
        variant='outlined'
        size='small'
        sx={{
          width: '60px', // Adjust the width according to your preference
          mr: 1, // Add margin on the right if needed
        }}
        InputProps={{
          min: '1',
          disableButtons: true,
          style: { textAlign: 'center' },
        }}
      />
      <StyleTinyButton onClickBtn={handleIncrease} text={'+'} />
    </Box>
  );
};

export default StyleInputNumberButton;
