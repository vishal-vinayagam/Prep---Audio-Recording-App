import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLV7MNFILITKQjNvlHgBfO9OsrYu0ZR0I",
  authDomain: "dude-a2469.firebaseapp.com",
  projectId: "dude-a2469",
  storageBucket: "dude-a2469.firebasestorage.app",
  messagingSenderId: "122540821032",
  appId: "1:122540821032:web:14d1532f11447d8432031d",
  measurementId: "G-Y7DMFPV2P1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);