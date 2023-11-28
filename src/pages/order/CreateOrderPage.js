import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedItems } from '../../redux/slice/cartSlice';

const CreateOrderPage = () => {
  const selectedItems = useSelector(selectSelectedItems);
  console.log(selectedItems);
  return <div>CreateOrderPage</div>;
};

export default CreateOrderPage;
