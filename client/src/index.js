import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import idsReducer from './reducers/ids';

import App from './App';
import './index.css';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        ids: idsReducer,
    }
})

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
