// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBprE5kpoF3FyvOi7v4IuVw3mipsGxPvvY",
  authDomain: "dev-swift-scan.firebaseapp.com",
  projectId: "dev-swift-scan",
  storageBucket: "dev-swift-scan.appspot.com",
  messagingSenderId: "768973663891",
  appId: "1:768973663891:web:e4ec4881df4fa37ef46766",
  measurementId: "G-K91QNBCQ2T",

//   databaseURL: "https://dev-swift-scan-default-rtdb.europe-west1.firebasedatabase.app/" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app)
// const db = getDatabase(app)
const db = getFirestore(app)

export { app, auth, db }