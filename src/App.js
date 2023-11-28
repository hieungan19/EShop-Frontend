import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CustomAppBar, CustomFooter } from './components';
import { HomePage, Login, Register } from './pages';
import { ThemeProvider } from '@emotion/react';
import 'react-toastify/dist/ReactToastify.css';
import Slider from './components/slider/Slider';
import theme from './styles/theme';
import { ToastContainer } from 'react-toastify';
import Admin from './pages/admin/Admin';
import AdminOnlyRoute from './components/admin-only-route/AdminOnlyRoute';
import { CssBaseline } from '@mui/material';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import ProductCard from './components/product/ProductCard';
import { Home } from '@mui/icons-material';
import CartItemRow from './components/cart/CartItem';
import ReviewForm from './components/review/ReviewForm';
import OrderCard from './components/order/OrderCard';
import OrderedProductItemCard from './components/order/OrderProductItemCard';
import OrderItemList from './components/order/OrderItemList';
import Invoice from './components/order/Invoice';
import UserProfilePage from './pages/user/UserProfilePage';
import OrderForm from './components/order/OrderInputForm';
import ProductFilter from './components/product-filter/ProductFilter';
import ProductSort from './components/product-filter/ProductSort';
import CartPage from './pages/cart/CartPage';
import CreateOrderPage from './pages/order/CreateOrderPage';
function App() {
  const product = {
    id: 1,
    name: 'Product Name',
    maxPrice: 50000,
    minPrice: 10000,
    description: 'Product description goes here.',
    category: 'Electronics',
    image: 'https://placekitten.com/200/300', // Replace with the actual image URL
    options: [
      { id: 1, name: 'Option 1', price: 2.99 },
      { id: 2, name: 'Option 2', price: 4.99 },
      // Add more options as needed
    ],
    reviews: [
      {
        id: 1,
        rating: 4,
        review: 'Great product!',
        user: { id: 1, name: 'John Doe', avatar: 'user1_avatar_url.jpg' },
        createdAt: new Date('2023-01-15T12:30:00'), // Replace with actual datetime
      },
      {
        id: 2,
        rating: 5,
        review: 'Excellent quality.',
        user: { id: 2, name: 'Jane Smith', avatar: 'user2_avatar_url.jpg' },
        createdAt: new Date('2023-01-16T10:45:00'), // Replace with actual datetime
      },
      // Add more reviews as needed
    ],
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer autoClose={1000} />
      <CustomAppBar />
      {/* <ProductDetail /> */}
      {/* <OrderCard />
      <OrderItemList /> */}
      {/* <OrderedProductItemCard /> */}
      {/* <ReviewForm /> */}
      {/* <Invoice />
      <OrderForm />
      <UserProfilePage /> */}
      {/* <ProductFilter /> */}
      {/* <ProductSort /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='create-order' element={<CreateOrderPage />} />
        <Route
          path='/admin/*'
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
      </Routes>
      <CustomFooter />
    </ThemeProvider>
  );
}

export default App;
