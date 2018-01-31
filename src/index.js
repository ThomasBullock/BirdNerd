import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';
import registerServiceWorker from './registerServiceWorker';
import Raven from 'raven-js';
import { sentry_url } from './config';

import store from './store';
import history from './history';
import Main from './components/Main';
import { authUser } from './ducks/auth';
import './styles/css/styles.css';

if(process.env.NODE_ENV === 'production') {
	Raven.config(sentry_url).install();
}

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
