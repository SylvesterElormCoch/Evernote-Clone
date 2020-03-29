import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require(firebase);
require(firebase/firestore)

var firebaseConfig = {
    apiKey: "AIzaSyB7t4vcRtPHWMtvLTC0tK9ZXSFdGBTFNJc",
    authDomain: "evernote-clone-908d1.firebaseapp.com",
    databaseURL: "https://evernote-clone-908d1.firebaseio.com",
    projectId: "evernote-clone-908d1",
    storageBucket: "evernote-clone-908d1.appspot.com",
    messagingSenderId: "37437546919",
    appId: "1:37437546919:web:dcc162da6ea8edfa4d5682"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
