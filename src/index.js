import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRobot, faCartPlus, faShoppingCart, faCashRegister, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faRobot, faCartPlus, faShoppingCart, faCashRegister, faPlus, faMinus)



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
