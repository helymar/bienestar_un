import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './index.css';
import App from './App';
import { AuthProvider } from 'context/AuthProvider';
import { CookiesProvider } from 'react-cookie';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0200AB',
    },
    primaryDark: {
      main: '#01007C',
    },
    secondary: {
      main: '#00A1AB',
    },
    white: {
      main: '#FFF'
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider >
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
