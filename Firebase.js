import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyA_K9trF0iXJ4HRKBrtpKCu6a0WE464fos",
    authDomain: "mobile-6359c.firebaseapp.com",
    projectId: "mobile-6359c",
    storageBucket: "mobile-6359c.appspot.com",
    messagingSenderId: "530505614502",
    appId: "1:530505614502:web:d3da677bd98a0e96bde067"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()