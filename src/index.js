import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import registerServiceWorker from './registerServiceWorker';
import Raven from 'raven-js';

import store from './store';
import history from './history';
import Main from './components/Main';
import { authUser } from './ducks/auth';
import './styles/css/styles.css';


import { sentry_url } from './config';

Raven.config(sentry_url).install();

const token = window.sessionStorage.getItem('token');
if (token) {
    const decoded = jwtDecode(token);
    store.dispatch(authUser(decoded));
}
const router = (
	<Provider store={store}>
    <ConnectedRouter history={history}>
        <Route path='/' component={Main} />
    </ConnectedRouter>
   </Provider> 
)

ReactDOM.render(
    router,
    document.getElementById('root')
);
registerServiceWorker();
