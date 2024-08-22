// Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// Database
import { db } from '../db/db.js';

const orderManager = async (cart, name, email) => {
  try {
    const orderRef = collection(db, 'orders');
    await addDoc(orderRef, {
      items: cart.map(item => ({
        id: item.id ? item.id : null,
        title: item.title ? item.title : null,
        quantity: item.quantity ? item.quantity : null,
        price: item.price ? item.price : null
      })),
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      name,
      email,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  orderManager,
};
