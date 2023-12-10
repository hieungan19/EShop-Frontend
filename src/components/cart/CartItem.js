import DeleteIcon from '@mui/icons-material/Delete';
import {
  CardMedia,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import StyleInputNumberButton from '../style-component/StyleInputNumberButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, selectUserToken } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  deleteDataAxios,
  fetchDataAxios,
  putDataAxios,
} from '../../api/customAxios';
import { STORE_ITEMS_TO_CART } from '../../redux/slice/cartSlice';

const CartItemRow = ({ item, onSelect }) => {
  const [isChecked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState(item.currentPrice * quantity);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();

  //handle quantity
  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    changeOptionQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      changeOptionQuantity(quantity - 1);
    }
  };

  //delete cart item
  const onDelete = async () => {
    try {
      const data = {
        userId: userId,
        optionId: item.id,
      };
      console.log(token);
      const response = await deleteDataAxios({
        url: 'carts',
        data: data,
        token: token,
      });

      const cartItems = await fetchDataAxios({
        url: `carts/${userId}`,
        token: token,
      });
      dispatch(STORE_ITEMS_TO_CART({ cartItems: cartItems.options }));
      toast.success('Delete success');
    } catch (error) {
      toast.error('Failed. ');
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);

    changeOptionQuantity(event.target.value);
  };

  const changeOptionQuantity = async (quantity) => {
    setTotal(item.currentPrice * quantity);

    try {
      const data = {
        userId: userId,
        optionId: item.id,
        quantity: quantity,
      };
      const response = await putDataAxios({
        url: 'carts',
        data: data,
        token: token,
      });
      const cartItems = await fetchDataAxios({
        url: `carts/${userId}`,
        token: token,
      });
      dispatch(STORE_ITEMS_TO_CART({ cartItems: cartItems.options }));
    } catch (error) {
      toast.error('Failed to change option quantity.');
    }
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isChecked}
          onChange={() => {
            setChecked(!isChecked);

            onSelect({
              item: item,
              quantity: quantity,
              isChecked: !isChecked,
            });
          }}
        />
      </TableCell>
      <TableCell>
        <CardMedia
          component='img'
          alt={item.productName}
          sx={{ height: '60px', width: '60px', objectFit: 'cover' }}
          image={item.productImageUrl}
        />
      </TableCell>
      <TableCell>{item.productName}</TableCell>
      <TableCell>{item.name}</TableCell>

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
