// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLmuH_smqD2jQ2cFJ0APJB2IcXJ_Ln8Zo",
  authDomain: "pass-manager-d358a.firebaseapp.com",
  projectId: "pass-manager-d358a",
  storageBucket: "pass-manager-d358a.appspot.com",
  messagingSenderId: "581324927137",
  appId: "1:581324927137:web:b063ab86c17a2f4f7240e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)