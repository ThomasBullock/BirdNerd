import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import bird from './bird';
import birdList from './birdList';
import photo from './photo';
import photos from './photos';
import location from './location';
import auth from './auth';

const rootReducer = combineReducers({
    bird,
    birdList,
    photo,
    photos,
    location,
    auth,
    form,
});

export default rootReducer; 