import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ProductSort() {
  const [sort, setSort] = React.useState('latest');

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '16px' }}>
      <FormControl style={{ marginRight: '16px', minWidth: '120px' }}>
        <InputLabel htmlFor='sort-by'>Sort by:</InputLabel>
        <Select
          value={sort}
          onChange={handleSortChange}
          label='Sort by'
          inputProps={{
            name: 'sort-by',
            id: 'sort-by',
          }}
        >
          <MenuItem value='latest'>Latest</MenuItem>
          <MenuItem value='lowest-price'>Lowest Price</MenuItem>
          <MenuItem value='highest-price'>Highest Price</MenuItem>
          <MenuItem value='a-z'>A - Z</MenuItem>
          <MenuItem value='z-a'>Z - A</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default ProductSort;
