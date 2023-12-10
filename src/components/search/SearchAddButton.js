import { Button, IconButton, TextField } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const SearchAddButton = ({ searchTerm, handleSearchChange, onClickAddBtn }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '10px',
        marginTop: '10px',
      }}
    >
      <TextField
        label='Search '
        variant='outlined'
        fullWidth
        margin='normal'
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 0, p: 0 }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <Button
        variant='contained'
        color='primary'
        style={{ marginLeft: '10px' }}
        startIcon={<AddIcon />}
        onClick={onClickAddBtn}
      >
        Add
      </Button>
    </div>
  );
};

export default SearchAddButton;
