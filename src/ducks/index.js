import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import bird from './bird';
import photos from './photos';
import location from './location';
import auth from './auth';
import loading from './loading';

const rootReducer = combineReducers({
    bird,
    photos,
    location,
    auth,
    form,
    loading,
});

export default rootReducer; 