import * as firebase from 'firebase';


// change lines below with your own Firebase snippets!
var config = {
  apiKey: "AIzaSyB0x3C1HGZguxLkYr7YAsQoyfxCVH5F-CU",
  authDomain: "testdb-devcamp.firebaseapp.com",
  databaseURL: "https://testdb-devcamp.firebaseio.com",
  projectId: "testdb-devcamp",
  storageBucket: "testdb-devcamp.appspot.com",
  messagingSenderId: "431699431079",
  appId: "1:431699431079:web:7fcfa494794187d3"
};

const fire = firebase.initializeApp(config);
export default fire;