import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCOtgb4kGfIz_FsUhHD8NNbX6rRqQnQ5JU",
  authDomain: "instagram-clone-e2b23.firebaseapp.com",
  databaseURL: "https://instagram-clone-e2b23.firebaseio.com",
  projectId: "instagram-clone-e2b23",
  storageBucket: "instagram-clone-e2b23.appspot.com",
  messagingSenderId: "259867741638",
  appId: "1:259867741638:web:889befb931e4902689f6c7",
  measurementId: "G-X2QGS9LEBY",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };