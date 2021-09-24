import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDzx77dioJ3IWsb2CYFDNlAf2kPTPpoBRk",
    authDomain: "autht-8647f.firebaseapp.com",
    projectId: "autht-8647f",
    storageBucket: "autht-8647f.appspot.com",
    messagingSenderId: "244082703409",
    appId: "1:244082703409:web:31b709dc49599ac0c26910"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth()