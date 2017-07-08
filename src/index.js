import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import router from './router';
//import rootSaga from 'sagas';
//import reducer from './ducks';
import registerServiceWorker from './registerServiceWorker';

//const sagaMiddleware = createSagaMiddleware();
//export const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk));
//sagaMiddleware.run(rootSaga);

ReactDOM.render(
  //<Provider store={store}>
    router,
  //</Provider>,
  document.getElementById('root')
);
registerServiceWorker();
