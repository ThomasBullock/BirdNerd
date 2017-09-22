import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import bird from './bird';
import birdList from './birdList';
import photo from './photo';
import myPhotos from './myPhotos';
import auth from './auth';

const rootReducer = combineReducers({
    bird,
    birdList,
    photo,
    myPhotos,
    auth,
    form,
});

export default rootReducer; 