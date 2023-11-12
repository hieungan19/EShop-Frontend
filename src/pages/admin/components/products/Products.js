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
import useDebounce from '../../../../customHooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { fetchDataAxios } from '../../../../api/customAxios'; // Replace with your API utility function
import SearchAddButton from '../../../../components/search/SearchAddButton';
import StyleTableHeader from '../../../../components/style-component/StyleTableHeader';
import { Colors } from '../../../../style/theme';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearchTerm]);

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : [];

  const fetchData = async () => {
    try {
      const response = await fetchDataAxios({ url: 'products' });
      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  const renderPageNumbers = () => {
    const pageButtons = [];
    for (let i = 1; i <= pageNumbers; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
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
    <div>
      <SearchAddButton
        searchTerm={searchTerm}
        onClickAddBtn={() => {}}
        handleSearchChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyleTableHeader>Product ID</StyleTableHeader>
              <StyleTableHeader>Image</StyleTableHeader>
              <StyleTableHeader>Product Name</StyleTableHeader>
              <StyleTableHeader>Description</StyleTableHeader>
              <StyleTableHeader>Category</StyleTableHeader>
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
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>
                  <Container
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                    }}
                  >
                    <IconButton onClick={() => {}}>
                      <EditIcon sx={{ color: Colors.primary }} />
                    </IconButton>
                    <IconButton onClick={() => {}}>
                      <DeleteIcon sx={{ color: Colors.secondary }} />
                    </IconButton>
                  </Container>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '16px 0',
          }}
        >
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            sx={{ margin: '0 2px', fontSize: '24px', p: 0 }}
          >
            {'<'}
          </Button>
          {renderPageNumbers()}
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageNumbers}
            sx={{ margin: '0 2px', fontSize: '24px', p: 0 }}
          >
            {'>'}
          </Button>
        </div>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
