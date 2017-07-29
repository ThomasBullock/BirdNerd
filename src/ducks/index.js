// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form/immutable';
import * as reducers from './birds';


const rootReducer = combineReducers(reducers);

export default rootReducer;