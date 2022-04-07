import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getStorage , ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6PthfLXIrU6cLpLUZYv9ub5qW7LJWDzw",
  authDomain: "dojo-77fc0.firebaseapp.com",
  projectId: "dojo-77fc0",
  storageBucket: "dojo-77fc0.appspot.com",
  messagingSenderId: "225066026366",
  appId: "1:225066026366:web:5ec9ec85b66abac87a1f2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

// sign in
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// log in
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// log out
export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}


// Storage
export async function upload(file , currentUser , setLoading){
  const fileRef = ref(storage , currentUser.uid + '.png');
  setLoading(true)
  const snapshot = await uploadBytes(fileRef, file)
  setLoading(false)
  alert("uploaded file")
  // return snapshot
}
