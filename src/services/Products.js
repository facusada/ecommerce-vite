// Firebase
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';
// Database
import { db } from '../db/db.js';

const fetchAllProducts = async () => {
  try {
    const productsRef = collection(db, 'products')
    const dataDb = await getDocs(productsRef);
    const productsDb = dataDb.docs.map((product) => {
      return {
        id: product.id, ...product.data()
      }
    })
    return productsDb;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchProductById = async (productId) => {
  try {
    const productsRef = collection(db, 'products');
    const dataDb = await getDocs(productsRef);
    const productSelected = dataDb.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .find(product => product.id === productId);

    return productSelected
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProductStock = async (productId, newStock) => {
  const productRef = doc(db, 'products', productId);

  await updateDoc(productRef, {
    stock: newStock,
  });
};

export {
  fetchAllProducts,
  fetchProductById,
  updateProductStock
};
