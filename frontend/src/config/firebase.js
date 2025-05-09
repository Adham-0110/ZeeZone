import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFgXt0LEqnOgsGWLV1EiVhSzd4UEOCeh0",
  authDomain: "zeezone-69e42.firebaseapp.com",
  projectId: "zeezone-69e42",
  storageBucket: "zeezone-69e42.firebasestorage.app",
  messagingSenderId: "581754142639",
  appId: "1:581754142639:web:525aa5d8632ccf5b4bb95a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth