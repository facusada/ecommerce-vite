// Firebase
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// Database
import { auth, db } from '../db/db.js'
// Utils
import { getIdToken } from '../utils/getIdToken.js';
// Axios
import axios from 'axios';

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
  const url = import.meta.env.VITE_API_LOCAL_URL

  try {
    const idToken = await getIdToken(email, password)

    const response = await axios.post(`${url}/auth/login`, {
      idToken
    }, {
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
    } else {
      throw new Error('Failed to login');
    }

    return { success: true, user: response.data.userData.user };
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
