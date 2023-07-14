import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import reducers from './reducers';
import apiCallsReducer from './reducers/posts';

import App from './App';

const store = configureStore({
    reducer: {
        apiCalls: apiCallsReducer
    }
})
ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
