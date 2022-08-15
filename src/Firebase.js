// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage, ref, listAll} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkoZx66r00zMwRx3KYQYblrl_DoGMgJnw",
  authDomain: "image-gallery-b9f14.firebaseapp.com",
  projectId: "image-gallery-b9f14",
  storageBucket: "image-gallery-b9f14.appspot.com",
  messagingSenderId: "67114126661",
  appId: "1:67114126661:web:6c92f0dd8649fed54f822c",
  measurementId: "G-04KSB0R851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
export {db, storage, storageRef};