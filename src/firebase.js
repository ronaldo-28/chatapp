// src/firebase.js (or src/config/firebase.js)

import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// --- IMPORTANT: Replace with your actual Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyAnvot-IUOHHadnJ8pDo-0404meXtkd5t0",
  authDomain: "chatapp-1f084.firebaseapp.com",
  projectId: "chatapp-1f084",
  storageBucket: "chatapp-1f084.firebasestorage.app",
  messagingSenderId: "866992464476",
  appId: "1:866992464476:web:04d3d9a4b10f71e69dfc99",
  measurementId: "G-83PW3YYNCW",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Optional: Enable offline persistence (uses IndexedDB)
// This helps the app work offline and syncs when connection is restored.
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("Firestore persistence failed: Multiple tabs open?");
  } else if (err.code === "unimplemented") {
    console.warn(
      "Firestore persistence failed: Browser does not support offline persistence."
    );
  } else {
    console.error("Firestore persistence error:", err);
  }
});

// Export the Firestore database instance for use in other parts of the app
export { db };
