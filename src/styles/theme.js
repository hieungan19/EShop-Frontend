import { createTheme } from '@mui/material/styles';
import { lighten } from 'polished';
export const DRAWER_WIDTH = '240px';
export const Colors = {
  primary: '#588E76',
  secondary: '#FFA54F',
  success: '#4CAF50',
  info: '#00a2ff',
  danger: '#FF5722',
  warning: '#FFC107',
  dark: '#0e1b20',
  light: '#aaa',
  muted: '#abafb3',
  border: '#DDDFE1',
  inverse: '#2F3D4A',
  shaft: '#333',
  ///////////////
  // Grays
  ///////////////
  dim_gray: '#696969',
  dove_gray: '#d5d5d5',
  body_bg: '#f3f6f9',
  light_gray: 'rgb(245,245,245)',
  ///////////////
  // Solid Color
  ///////////////
  white: '#fff',
  black: '#000',
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: 0,
          margin: 0,
          backgroundColor: Colors.light_gray,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: Colors.primary,
          color: Colors.white,
        },
      },
    },
  },
});
export default theme;
