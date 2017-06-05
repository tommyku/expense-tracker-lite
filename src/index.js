import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import expenseAppLite from './reducers';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-virtualized/styles.css';
import './index.css';

let store;

switch (process.env.NODE_ENV) {
  case 'development':
    store = createStore(
      expenseAppLite,
      applyMiddleware(
        thunkMiddleware,
        createLogger()
      )
    );
    break;
  default:
    store = createStore(
      expenseAppLite,
      applyMiddleware(
        thunkMiddleware,
      )
    );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
