import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import idsReducer from './reducers/ids';

import App from './App';
import './index.css';

import dotenv from 'dotenv';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        ids: idsReducer,
    }
})

dotenv.config();
const clientId = process.env.AUTH_CLIENT_ID;
console.log(clientId);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
