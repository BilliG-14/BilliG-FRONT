// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { initializeApp } from "firebase/app";
// import firebase from "firebase/app"; // 강의 ver.
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEw-AjhLyKgXLnTe18gqnzXz3YEe_x4b8",
  authDomain: "react-firebase-chat-app-9f51f.firebaseapp.com",
  projectId: "react-firebase-chat-app-9f51f",
  storageBucket: "react-firebase-chat-app-9f51f.appspot.com",
  messagingSenderId: "623649810941",
  appId: "1:623649810941:web:d0433ffd5f4d05b6b01194",
  measurementId: "G-K19929D2VD",
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig); // 강의 ver.
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
