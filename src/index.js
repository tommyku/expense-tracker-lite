import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import expenseAppLite from './reducers';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const loggerMiddleware = createLogger();

const store = createStore(
  expenseAppLite,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
