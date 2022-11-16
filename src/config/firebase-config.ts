import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyASzPWb2a8M7CTmYIaLABtncxzS0ODM2vU",
  authDomain: "chatapp-bf32e.firebaseapp.com",
  databaseURL: "https://chatapp-bf32e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatapp-bf32e",
  storageBucket: "chatapp-bf32e.appspot.com",
  messagingSenderId: "1046924428928",
  appId: "1:1046924428928:web:990b0094974001c4768865",
  measurementId: "G-BER8LNHWV1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth, firebase }