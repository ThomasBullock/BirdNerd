import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store';
import Main from './components/Main';
import './styles/css/index.css';

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
