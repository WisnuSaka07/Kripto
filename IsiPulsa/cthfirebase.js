// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjATa-meOdAdQh-nO72ZgFiMgYTg61dNg",
  authDomain: "aplikasi-encrip-pulsa.firebaseapp.com",
  projectId: "aplikasi-encrip-pulsa",
  storageBucket: "aplikasi-encrip-pulsa.appspot.com",
  messagingSenderId: "686840150982",
  appId: "1:686840150982:web:d787d3357279b96cd810c7"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const projectFirestore = firebase.firestore()
// export { projectFirestore }
// export const db = getFirestore()