import { Button } from '@mui/material';
import React from 'react';

const StyleTinyButton = ({ onClickBtn, text }) => {
  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={onClickBtn}
      size='small'
      sx={{
        p: 0,
        minWidth: '25px',
        minHeight: '20px',
        fontWeight: 'bold',
      }}
    >
      {text}
    </Button>
  );
};

export default StyleTinyButton;
