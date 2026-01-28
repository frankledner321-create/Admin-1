
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAV-hD_ELg8Lycpp8TwLVHaA4s9mdNY2y0",
  authDomain: "admin-d8fc1.firebaseapp.com",
  databaseURL: "https://admin-d8fc1-default-rtdb.firebaseio.com",
  projectId: "admin-d8fc1",
  storageBucket: "admin-d8fc1.firebasestorage.app",
  messagingSenderId: "311628713306",
  appId: "1:311628713306:web:92843603dcc7a41d72b763"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
