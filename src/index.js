import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import store from './store';
import history from './history';
import Main from './components/Main';
import { authUser } from './ducks/auth';
import './styles/css/index.css';

const token = window.sessionStorage.getItem('token');
if (token) {
    store.dispatch(authUser());
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
