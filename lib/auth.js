import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signUp = async (email, password, additionalData = {}) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Default data with placeholders
    const defaultData = {
      nickname: '',
      posts: [],
      bio: '',
      profilePicture: '', 
      followes: [],
      following: [],
      likes: ''
    };

    // Merge the default data with any additional data provided by the user
    const userData = {
      email: user.email,
      ...defaultData,
      ...additionalData,  // This will overwrite defaults if user provides data
    };

    // Create a user document in Firestore with additional data
    await setDoc(doc(db, 'users', user.uid), userData);

    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
