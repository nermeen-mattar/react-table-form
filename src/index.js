import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import reducer from "./store/reducers";
import { rootSaga } from "./store/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware(); // a factory that creates an instance of the middleware

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga); // redux saga is a middleware used in reactjs and is leveraging an ES6 feature called Generators

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
