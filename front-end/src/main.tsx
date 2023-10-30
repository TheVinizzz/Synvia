import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes';
import { ChakraProvider } from '@chakra-ui/react'
import queryClient from './utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./main.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
