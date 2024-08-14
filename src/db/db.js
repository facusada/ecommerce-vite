import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyGT0am5ezuc64d1UL9FfPWnfisfKd-ps",
  authDomain: "ecommerce-coder-house-1dd5d.firebaseapp.com",
  projectId: "ecommerce-coder-house-1dd5d",
  storageBucket: "ecommerce-coder-house-1dd5d.appspot.com",
  messagingSenderId: "87285257294",
  appId: "1:87285257294:web:8e065c02e2509a9b8c1f1f"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
