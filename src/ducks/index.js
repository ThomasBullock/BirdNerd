import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import bird from './bird';
import birdList from './birdList';
import auth from './auth';

const rootReducer = combineReducers({
    bird,
    birdList,
    auth,
    form,
});

export default rootReducer; 