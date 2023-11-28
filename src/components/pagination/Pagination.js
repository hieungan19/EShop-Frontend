import React from 'react';
import { Button } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={currentPage === i ? 'contained' : 'outlined'}
          sx={{ margin: '0 2px' }}
        >
          {i}
        </Button>
      );
    }
    return pageButtons;
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{ margin: '0 2px', fontSize: '24px', p: 0 }}
      >
        {'<'}
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{ margin: '0 2px', fontSize: '24px', p: 0 }}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default Pagination;
