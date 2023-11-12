import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CustomAppBar, CustomFooter } from './components';
import { HomePage, Login, Register } from './pages';
import { ThemeProvider } from '@emotion/react';
import 'react-toastify/dist/ReactToastify.css';
import Slider from './components/slider/Slider';
import theme from './style/theme';
import { ToastContainer } from 'react-toastify';
import Admin from './pages/admin/components/Admin';
import AdminOnlyRoute from './components/admin-only-route/AdminOnlyRoute';
import { CssBaseline } from '@mui/material';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer autoClose={1000} />
      <CustomAppBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
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
