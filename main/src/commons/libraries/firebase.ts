// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi1eQ8ZV-YkOG2wnOe6QLUvq9zYWczXx4",
  authDomain: "porscheweb-74e68.firebaseapp.com",
  databaseURL: "https://porscheweb-74e68-default-rtdb.firebaseio.com",
  projectId: "porscheweb-74e68",
  storageBucket: "porscheweb-74e68.appspot.com",
  messagingSenderId: "918952392953",
  appId: "1:918952392953:web:ffba9f1ef2738845b94a28",
  measurementId: "G-4Q603GWTMC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);