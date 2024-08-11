// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarieszz

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "dev-swift-scan.firebaseapp.com",
  projectId: "dev-swift-scan",
  // storageBucket: "dev-swift-scan.appspot.com",
  storageBucket: "gs://dev-swift-scan.appspot.com",
  messagingSenderId: process.env.EXPO_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-K91QNBCQ2T",

  //   databaseURL: "https://dev-swift-scan-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
// const db = getDatabase(app)
const db = getFirestore(app);

export { app, auth, db };
