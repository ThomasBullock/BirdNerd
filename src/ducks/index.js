import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import bird from './bird';
import auth from './auth';

const rootReducer = combineReducers({
    bird,
    auth,
    form,
});

export default rootReducer; 