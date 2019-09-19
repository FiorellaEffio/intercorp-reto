import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB1_e5kRjuxPZqcHIB5XXp7-HQNhpLO3ro",
    authDomain: "intercorp-clientes.firebaseapp.com",
    // databaseURL: "https://intercorp-clientes.firebaseio.com",
    projectId: "intercorp-clientes" //,
    // storageBucket: "intercorp-clientes.appspot.com",
    // messagingSenderId: "694155640581",
    // appId: "1:694155640581:web:38ccb6ccc217e24e1b016c"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;