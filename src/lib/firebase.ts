import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7AFU3F1htxIKUXCz91RyA1uwrH_rIX4Y",
  authDomain: "chating-4432.firebaseapp.com",
  databaseURL: "https://chating-4432-default-rtdb.firebaseio.com",
  projectId: "chating-4432",
  storageBucket: "chating-4432.appspot.com",
  messagingSenderId: "319986242781",
  appId: "1:319986242781:web:c15ffbebb0efe977a93734",
  measurementId: "G-TRM2KHSBGP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);