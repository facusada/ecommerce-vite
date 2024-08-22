// Firebase
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// Database
import { auth, db } from '../db/db.js'

const createUser = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;


    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export {
  createUser,
  loginUser,
  logoutUser,
};
