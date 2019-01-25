import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { reducer } from "./store/redux";
import { watcherSaga } from "./store/sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

middlewares.push(logger);

const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
