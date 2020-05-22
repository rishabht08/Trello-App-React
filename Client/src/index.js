import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore , applyMiddleware } from "redux";
import reducer from "./store/reducers/index"
import { Provider } from 'react-redux';
import thunk from "redux-thunk";


// Your web app's Firebase configuration

// Initialize Firebase



const store = createStore(reducer , applyMiddleware(thunk));
const jsx = (
    <Provider store = {store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
