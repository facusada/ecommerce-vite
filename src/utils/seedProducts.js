// Firebase
import { addDoc, collection } from 'firebase/firestore';
// Database
import db from '../db/db.js';

const seedProducts = async () => {
  data.map(({ id, ...rest }) => {
    const products = collection(db, 'products');
    addDoc(products, rest)
  })

  console.log('Products seeded successfully');
};

seedProducts();
