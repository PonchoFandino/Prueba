import * as firebase from 'firebase';



const DB_CONFIG= {
  apiKey: "AIzaSyD4UlpxCG3N1XxdgLl7o9X7zHaFPy8SLUs",
  authDomain: "tareasfandino.firebaseapp.com",
  databaseURL: "https://tareasfandino.firebaseio.com",
  projectId: "tareasfandino",
  storageBucket: "tareasfandino.appspot.com",
  messagingSenderId: "178398811459"
  };

  firebase.initializeApp(DB_CONFIG,"Notasks");

    const fDb = firebase.database();
    const fAuth = firebase.auth();
    const fProvider = new firebase.auth.GoogleAuthProvider();
    export { fAuth, fDb, fProvider };