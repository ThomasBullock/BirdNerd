import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import bird from './bird';
//import otherReducers if any

const rootReducer = combineReducers({
    bird,
    form,
    //other reducers if any
});

export default rootReducer; 