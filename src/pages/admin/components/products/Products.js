import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Pagination from '../../../../components/pagination/Pagination';
import useDebounce from '../../../../customHooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { deleteDataAxios, fetchDataAxios } from '../../../../api/customAxios'; // Replace with your API utility function
import SearchAddButton from '../../../../components/search/SearchAddButton';
import StyleTableHeader from '../../../../components/style-component/StyleTableHeader';
import { Colors } from '../../../../styles/theme';
import ProductFormDialog from './ProductFormDialog';
import ConfirmDeleteDialog from '../../../../components/dialogs/ConfirmDeleteDialog';
import { useDispatch } from 'react-redux';
import { STORE_PRODUCTS } from '../../../../redux/slice/productSlice';
import { toast } from 'react-toastify';

export const fetchProducts = async () => {
  try {
    const response = await fetchDataAxios({ url: 'products' });
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: 0, name: '' });
  const [isOpenDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    setCurrentProduct({ id: '', name: '' });
    setOpen(false);
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchProductsAndDispatch = async () => {
    const response = await fetchProducts();
    if (response) {
      setProducts(response.products);
      dispatch(STORE_PRODUCTS({ products: response.products }));
    }
  };

  useEffect(() => {
    fetchProductsAndDispatch();
  }, [currentPage, debouncedSearchTerm, dispatch]);

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDeleteProduct = async () => {
    try {
      const response = await deleteDataAxios({
        url: `products/${currentProduct.id}`,
      });

      if (response.status === 204) {
        toast.success('Product deleted successfully.');
        fetchProductsAndDispatch();
      }
    } catch (error) {
      toast.error('Error deleting product.');
    }
  };
  return (
    <div>
      <SearchAddButton
        searchTerm={searchTerm}
        onClickAddBtn={handleOpenDialog}
        handleSearchChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyleTableHeader>ID</StyleTableHeader>
              <StyleTableHeader>Ảnh</StyleTableHeader>
              <StyleTableHeader>Tên sản phẩm</StyleTableHeader>
              <StyleTableHeader>Phân loại</StyleTableHeader>
              <StyleTableHeader>Giá</StyleTableHeader>
              <StyleTableHeader></StyleTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    width='100'
                    height='100'
                    style={{ objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>
                  {product.minPrice} - {product.maxPrice}
                </TableCell>
                <TableCell>
                  <Container
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setCurrentProduct({
                          id: product.id,
                          name: product.name,
                        });
                        handleOpenDialog();
                      }}
                    >
                      <EditIcon sx={{ color: Colors.primary }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setCurrentProduct({
                          id: product.id,
                          name: product.name,
                        });
                        handleDeleteOpen();
                      }}
                    >
                      <DeleteIcon sx={{ color: Colors.secondary }} />
                    </IconButton>
                  </Container>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={pageNumbers}
          onPageChange={setCurrentPage}
        />
      </TableContainer>
      <ProductFormDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        productId={currentProduct.id}
        fetchProductsAndDispatch={fetchProductsAndDispatch}
      />
      <ConfirmDeleteDialog
        onClose={handleDeleteClose}
        open={isOpenDelete}
        onConfirm={handleDeleteProduct}
        data={currentProduct}
      />
    </div>
  );
};

export default ProductTable;
