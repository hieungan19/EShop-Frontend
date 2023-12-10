import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteDataAxios, fetchDataAxios } from '../../../../api/customAxios';
import ConfirmDeleteDialog from '../../../../components/dialogs/ConfirmDeleteDialog';
import TableStyleHeader from '../../../../components/style-component/StyleTableHeader';
import { selectUserToken } from '../../../../redux/slice/authSlice';
import { STORE_CATEGORIES } from '../../../../redux/slice/categorySlice';
import { Colors } from '../../../../styles/theme';
import CategoryFormDialog from './CategoryFormDialog';
export const fetchCategories = async () => {
  console.log('Fetch categories');
  try {
    const response = await fetchDataAxios({ url: 'categories' });
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState({ name: '', id: '' });
  const [isUpdate, setIsUpdate] = useState(false);
  const token = useSelector(selectUserToken);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const fetchDataAndDispatch = async () => {
    const response = await fetchCategories();

    if (response) {
      setCategories(response.categories);
      dispatch(STORE_CATEGORIES({ categories: response.categories }));
    }
  };

  useEffect(() => {
    fetchDataAndDispatch();
  }, []);

  const filteredCategories = categories
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const [open, setOpen] = React.useState(false);
  const [isOpenDelete, setDeleteOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteDataAxios({
        url: `categories/${currentCategory.id}`,
        token: token,
      });

      if (response.status === 204) {
        toast.success('Category deleted successfully.');
        fetchDataAndDispatch();
      }
    } catch (error) {
      toast.error('Error deleting category.');
    }
    handleDeleteClose();
  };

  return (
    <div style={{ marginTop: '10px', marginRight: '10px' }}>
      <div
        style={{ display: 'flex', alignItems: 'stretch', marginBottom: '10px' }}
      >
        <TextField
          label='Search Categories'
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
          onClick={() => {
            setIsUpdate(false);
            setCurrentCategory({ name: '' });
            handleClickOpen();
          }}
        >
          Add
        </Button>
      </div>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableStyleHeader>ID</TableStyleHeader>
              <TableStyleHeader>Phân loại</TableStyleHeader>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setCurrentCategory(category);
                      setIsUpdate(true);
                      handleClickOpen();
                    }}
                  >
                    <EditIcon sx={{ color: Colors.primary }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setCurrentCategory(category);
                      handleDeleteOpen();
                    }}
                  >
                    <DeleteIcon sx={{ color: Colors.secondary }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDeleteDialog
        onClose={handleDeleteClose}
        open={isOpenDelete}
        onConfirm={handleDelete}
        data={currentCategory}
      />

      <CategoryFormDialog
        onClose={handleClose}
        open={open}
        isUpdate={isUpdate}
        category={currentCategory}
        fetchData={fetchDataAndDispatch}
      ></CategoryFormDialog>
    </div>
  );
};

export default Categories;
