// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbcQ5OnCJfEJc96VHT3-bsbtCBbI3XDaA",
  authDomain: "chat-962c7.firebaseapp.com",
  projectId: "chat-962c7",
  storageBucket: "chat-962c7.appspot.com",
  messagingSenderId: "325033727152",
  appId: "1:325033727152:web:35c8923bf735bcc6eb5775"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();

