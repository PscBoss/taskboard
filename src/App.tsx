import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import MainAppBar from './components/app-bar/MainAppBar';
import HomeContents from './components/contents/home/HomeContents';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#BBDEFB',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#1A237E',
      secondary: '#64B5F6',
    },
  }
});

// Dark Mode
//   dark: {
//     mode: 'dark',
//     primary: {
//       main: '#42A5F5', // Brighter blue for primary in dark mode
//     },
//     secondary: {
//       main: '#1565C0', // Darker blue for secondary in dark mode
//     },
//     background: {
//       default: '#121212',
//       paper: '#1E1E1E',
//     },
//     text: {
//       primary: '#BBDEFB', // Light blue text for contrast in dark mode
//       secondary: '#64B5F6',
//     },
//   },
// },
// );

const App: React.FC = () => {

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainAppBar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <HomeContents />
    </ThemeProvider>
  )
};

export default App;