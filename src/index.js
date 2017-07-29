import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import store, { history } from './store';
import App from './components/App';

// import router from './router';
//import rootSaga from 'sagas';
// import reducer from './ducks';

import registerServiceWorker from './registerServiceWorker';
import './styles/css/index.css';

//const sagaMiddleware = createSagaMiddleware();
//export const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk));
//sagaMiddleware.run(rootSaga);

const router = (
	<Provider store={store}>
    <ConnectedRouter history={history}>
        <Route path='/' component={App} />
    </ConnectedRouter>
   </Provider> 
)

ReactDOM.render(
    router
 ,
  document.getElementById('root')
);
registerServiceWorker();
