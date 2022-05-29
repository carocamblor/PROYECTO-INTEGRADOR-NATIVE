import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5KO3OUn7IvYxn7Cx6CTf4ETLJAwY4lYA",
    authDomain: "proyecto-integrador-native.firebaseapp.com",
    projectId: "proyecto-integrador-native",
    storageBucket: "proyecto-integrador-native.appspot.com",
    messagingSenderId: "104192091061",
    appId: "1:104192091061:web:7f0c86c003be5a36f52ffc"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storgae = app.storage();
export const db = app.firestore();
