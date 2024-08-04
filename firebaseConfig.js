// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD672rJdlVzMUYb0NGfX5h330z1NyMPndE",
  authDomain: "pantry-app-2d9c8.firebaseapp.com",
  projectId: "pantry-app-2d9c8",
  storageBucket: "pantry-app-2d9c8.appspot.com",
  messagingSenderId: "716508763048",
  appId: "1:716508763048:web:91290fab10b068e598039d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFireStore(app);
