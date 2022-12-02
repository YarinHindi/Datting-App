// Import the functions you need from the SDKs you need

import firebase from '@react-native-firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSs40f47omBZMcaH-G7Xi-hYfAw1ZpuRc",
  authDomain: "datingapp-3423b.firebaseapp.com",
  projectId: "datingapp-3423b",
  storageBucket: "datingapp-3423b.appspot.com",
  messagingSenderId: "3639018862",
  appId: "1:3639018862:web:d85464bd44b737a593ad7f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

export {app}