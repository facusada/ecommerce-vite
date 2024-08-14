// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// Components
import App from './App';
// Context
import { CartProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartProvider>
);
