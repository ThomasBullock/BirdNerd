import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { routerReducer } from 'react-router-redux';

import bird from './bird';
import photos from './photos';
import location from './location';
import auth from './auth';
import users from './users';
import loading from './loading';

const rootReducer = combineReducers({
		router: routerReducer,
    bird,
    photos,
    location,
    auth,
    form,
    loading,
    users,
});

export default rootReducer; 