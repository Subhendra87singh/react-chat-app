import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAwKIWR9OHlV0bu9CWavX7-E1C2uSOEWH4",
    authDomain: "chat-app-ae9cc.firebaseapp.com",
    projectId: "chat-app-ae9cc",
    storageBucket: "chat-app-ae9cc.appspot.com",
    messagingSenderId: "198372498292",
    appId: "1:198372498292:web:2da4c129780b5dcca2ea21"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
