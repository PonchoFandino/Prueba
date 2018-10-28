import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyD4UlpxCG3N1XxdgLl7o9X7zHaFPy8SLUs",
    authDomain: "tareasfandino.firebaseapp.com",
    databaseURL: "https://tareasfandino.firebaseio.com",
    projectId: "tareasfandino",
    storageBucket: "tareasfandino.appspot.com",
    messagingSenderId: "178398811459"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
