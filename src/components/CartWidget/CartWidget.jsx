// React
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
// Context
import { useCart } from '../../context/CartContext';

const CartWidget = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-widget text-white">
      <Link to="/cart">
        <FaShoppingCart 
          style={{
            color: 'white'
          }}
          size={24}
        />
        <span className="badge badge-pill badge-primary">{totalItems}</span>
      </Link>
    </div>
  );
}

export default CartWidget;
