import React, {createContext, useState, useContext} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id? {...item, quantity: item.quantity + quantity}: item));
    } else {
      setCart([...cart, {...product, quantity}]);
    }
  };

  const emptyCart = () => {
    setCart([]);
  };

  const removeItem = (productId) => {
    setCart(cart.filter(item => item.id!== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, emptyCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};