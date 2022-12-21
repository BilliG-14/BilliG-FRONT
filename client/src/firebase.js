import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCEw-AjhLyKgXLnTe18gqnzXz3YEe_x4b8',
  authDomain: 'react-firebase-chat-app-9f51f.firebaseapp.com',
  projectId: 'react-firebase-chat-app-9f51f',
  storageBucket: 'react-firebase-chat-app-9f51f.appspot.com',
  messagingSenderId: '623649810941',
  appId: '1:623649810941:web:d0433ffd5f4d05b6b01194',
  measurementId: 'G-K19929D2VD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
