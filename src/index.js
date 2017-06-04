import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import expenseAppLite from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store = createStore(expenseAppLite);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
