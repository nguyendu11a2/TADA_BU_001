
// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAbQQTPeuJMcFm7IkrBXjMET-QN9LwqGpI",
  authDomain: "dclv-5b7dd.firebaseapp.com",
  databaseURL: "https://dclv-5b7dd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dclv-5b7dd",
  storageBucket: "dclv-5b7dd.appspot.com",
  messagingSenderId: "1046961546179",
  appId: "1:1046961546179:web:e2ce1f7e258d723b1d1376",
  measurementId: "G-8CZB73TX9X"
};
const firebaseDCLV = firebase.initializeApp(firebaseConfig);

export default firebaseDCLV;