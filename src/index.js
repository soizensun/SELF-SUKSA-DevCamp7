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
    user: null,
    visibleSignIn: false
}

const store = createStore(reducer(initialState));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);