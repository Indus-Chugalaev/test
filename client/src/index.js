import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

export let rerenderEntireTree = () => {

   ReactDOM.render(<App />, document.getElementById('root'));

   serviceWorker.unregister();
}

rerenderEntireTree()