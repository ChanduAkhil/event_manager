// src/App.jsx (Restore this file)
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';

const theme = createTheme({ palette: { mode: 'light' } });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;