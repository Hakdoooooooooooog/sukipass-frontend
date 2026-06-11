import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { CashierProvider } from '@/lib/cashier/CashierProvider';
import { queryClient } from './lib/queryClient';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CashierProvider>
          <App />
        </CashierProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
