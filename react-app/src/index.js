import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NB from './NaviBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<NB />, document.getElementById('root'));


serviceWorker.unregister();
