import DeleteIcon from '@mui/icons-material/Delete';
import {
  CardMedia,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import StyleInputNumberButton from '../style-component/StyleInputNumberButton';

const CartItemRow = ({ product, optionId, firstQuantity, onDelete }) => {
  const [isChecked, setChecked] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(optionId);
  const [quantity, setQuantity] = useState(firstQuantity);

  //handle quantity
  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const { name, image, options } = product;
  const option = options.find((opt) => opt.id === optionId);

  if (!option) {
    // Handle the case where the option with the given ID is not found
    return null;
  }

  const optionPrice = options.find((opt) => opt.id === selectedOptionId).price;

  const total = optionPrice * quantity;

  const onToggleSelect = () => {
    setChecked(!isChecked);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const onOptionChange = (e) => {
    const newOptionId = e.target.value;
    setSelectedOptionId(newOptionId);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isChecked} onChange={onToggleSelect} />
      </TableCell>
      <TableCell>
        <CardMedia
          component='img'
          alt={name}
          sx={{ height: '60px', width: '60px', objectFit: 'cover' }}
          image={image}
        />
      </TableCell>
      <TableCell>
        <Typography variant='body2' sx={{ marginLeft: 1 }}>
          {name}
        </Typography>
      </TableCell>
      <TableCell>
        <TextField
          select
          label='Options'
          value={selectedOptionId}
          onChange={onOptionChange}
          margin='dense'
        >
          {options.map((opt) => (
            <MenuItem key={opt.id} value={opt.id}>
              {opt.name}
            </MenuItem>
          ))}
        </TextField>
      </TableCell>
      <TableCell>{optionPrice}</TableCell>
      <TableCell>
        <StyleInputNumberButton
          handleChange={handleQuantityChange}
          handleDecrease={handleQuantityDecrease}
          handleIncrease={handleQuantityIncrease}
          data={quantity}
        />
      </TableCell>
      <TableCell>{total}</TableCell>
      <TableCell>
        <IconButton onClick={onDelete}>
          <DeleteIcon color='secondary' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartItemRow;
