import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import bird from './birds';
//import otherReducers if any

const rootReducer = combineReducers({
    bird,
    //other reducers if any
});

export default rootReducer; 