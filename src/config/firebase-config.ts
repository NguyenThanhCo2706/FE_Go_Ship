import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase, ref as refDatabase, push, onValue, set } from "firebase/database";
import { getStorage, ref as refStorage, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyASzPWb2a8M7CTmYIaLABtncxzS0ODM2vU",
//   authDomain: "chatapp-bf32e.firebaseapp.com",
//   databaseURL: "https://chatapp-bf32e-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "chatapp-bf32e",
//   storageBucket: "chatapp-bf32e.appspot.com",
//   messagingSenderId: "1046924428928",
//   appId: "1:1046924428928:web:990b0094974001c4768865",
//   measurementId: "G-BER8LNHWV1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCwxW0gIq5r_A4Su23SSgagGtdZQ7ceFK8",
  authDomain: "pbl6-goship.firebaseapp.com",
  databaseURL: "https://pbl6-goship-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pbl6-goship",
  storageBucket: "pbl6-goship.appspot.com",
  messagingSenderId: "1062481440286",
  appId: "1:1062481440286:web:000b50e40524df0661c80f",
  measurementId: "G-F46EPWB6P5"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const authentication = getAuth(app);
const storage = getStorage(app);

export {
  authentication,
  database,
  refDatabase,
  push,
  onValue,
  set,
  refStorage,
  storage,
  uploadBytes,
  listAll,
  getDownloadURL
} 