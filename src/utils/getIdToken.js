import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const getIdToken = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const idToken = await user.getIdToken();

    return idToken;
  } catch (error) {
    console.error('Error obtaining ID token:', error.message);
  }
};

export {
  getIdToken,
}