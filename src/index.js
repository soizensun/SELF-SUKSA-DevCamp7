import React from 'react';
import ReactDOM from 'react-dom';
import './cssFile/index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux-firebase/reducer';
const {fire} = require('./redux-firebase/firebaseControl')

const initialState = {
    subject: '',
    tagsInput: [],
    visibleInputDrawer: false,
    user: fire.auth().currentUser
}
// authListener() {
  //   fire.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.props.dispatch({ 
  //         type: 'SET_USER',
  //         payload: user
  //       });
  //       console.log('userID: ', user.uid);
  //     }
  //   })
  // }

const store = createStore(reducer(initialState));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);