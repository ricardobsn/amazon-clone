import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiQmKNrX6ZuRfkMq2QTHFIASyEURT-WfM",
  authDomain: "clone-6bd90.firebaseapp.com",
  projectId: "clone-6bd90",
  storageBucket: "clone-6bd90.appspot.com",
  messagingSenderId: "548892216006",
  appId: "1:548892216006:web:8e68c5b7aabb54bc0325c7",
  measurementId: "G-XT58MDMQ54",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
