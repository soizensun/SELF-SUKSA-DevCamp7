import React from 'react';
import ReactDOM from 'react-dom';
import './cssFile/index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reduxFile/reducer';

// import * as firebase from 'firebase';

// var firebaseConfig = {
//     apiKey: "AIzaSyB0x3C1HGZguxLkYr7YAsQoyfxCVH5F-CU",
//     authDomain: "testdb-devcamp.firebaseapp.com",
//     databaseURL: "https://testdb-devcamp.firebaseio.com",
//     projectId: "testdb-devcamp",
//     storageBucket: "testdb-devcamp.appspot.com",
//     messagingSenderId: "431699431079",
//     appId: "1:431699431079:web:7fcfa494794187d3"
// };
// firebase.initializeApp(firebaseConfig);

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

