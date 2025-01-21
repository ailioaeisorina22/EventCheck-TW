// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNF2TxqLoDxDJVxnPwczSXoBNrxHN8DNI",
  authDomain: "eventcheck-44a85.firebaseapp.com",
  databaseURL: "https://eventcheck-44a85-default-rtdb.firebaseio.com",
  projectId: "eventcheck-44a85",
  storageBucket: "eventcheck-44a85.firebasestorage.app",
  messagingSenderId: "495184799338",
  appId: "1:495184799338:web:e3ce1c1db533a528054c13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);