import React from 'react';

const ItemListContainer = ({ greeting }) => (
  <div className="container">
    <h2 className="mt-4">Products List</h2>
    <p>{greeting}</p>
  </div>
);

export default ItemListContainer;