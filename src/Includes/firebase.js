import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDkc2ONU2Z9roRRLVoF8rVCZO5CRTIikBU',
  authDomain: 'music-app-with-vue-9009b.firebaseapp.com',
  projectId: 'music-app-with-vue-9009b',
  storageBucket: 'music-app-with-vue-9009b.appspot.com',
  appId: '1:963372477440:web:d209b81d49677164e5bce5',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export { auth, db, usersCollection };
