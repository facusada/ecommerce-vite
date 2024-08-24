// Firebase
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
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

const getUserOrders = async (email) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    throw new Error('Failed to fetch user orders: ' + error.message);
  }
};

export {
  orderManager,
  getUserOrders
};
