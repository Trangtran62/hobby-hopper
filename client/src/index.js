import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import idsReducer from './reducers/ids';
import usersReducer from './reducers/users';

import App from './App';
import './index.css';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        ids: idsReducer,
        users: usersReducer,
    }
})

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
