
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZme55LrFBLwb20hvmqi_HwGS1fQUFKaA",
    authDomain: "taskmanager-mvp.firebaseapp.com",
    projectId: "taskmanager-mvp",
    storageBucket: "taskmanager-mvp.appspot.com",
    messagingSenderId: "541071327540",
    appId: "1:541071327540:web:f8385952b2ad4dddb22561",
    measurementId: "G-26X28PW0BY"
  };

//init firebase app
const firebaseApp = initializeApp(firebaseConfig);
//init firestore service
export const db = getFirestore();
// collection ref
export const colRef = collection(db,'todos');



