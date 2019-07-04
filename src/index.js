import React from 'react';
import ReactDOM from 'react-dom';
import './cssFile/index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux-firebase/reducer';

const initialState = {
    subject: '',
    tagsInput: [],
    visibleInputDrawer: false,
    user: null
}

const store = createStore(reducer(initialState));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);