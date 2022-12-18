// Import the functions you need from the SDKs you need


import { applicationDefault, initializeApp } from 'firebase-admin/app'


initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://DatingApp.firebaseio.com'
});


