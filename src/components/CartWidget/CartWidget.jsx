import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartWidget = () => {
  const itemCount = 3;

  return (
    <div className="cart-widget text-white">
      <FaShoppingCart size={24} />
      <span className="badge badge-pill badge-primary">{itemCount}</span>
    </div>
  );
}

export default CartWidget;