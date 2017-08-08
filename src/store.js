import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import rootReducer from './ducks';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [
  thunk,
  sagaMiddleware,
  routerMiddleware(history)
]

// connect redux dev tools
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)

sagaMiddleware.run(rootSaga);

export default store;
