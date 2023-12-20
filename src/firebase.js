// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0saFvPuUEH5AEEuSGpcgDmMC62fK-9Xs",
  authDomain: "react-chat-app-33e42.firebaseapp.com",
  databaseURL : "https://react-chat-app-33e42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-chat-app-33e42",
  storageBucket: "react-chat-app-33e42.appspot.com",
  messagingSenderId: "1038589139722",
  appId: "1:1038589139722:web:98d1025c3d0e68dec338f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const storage = getStorage(app);
export default app;