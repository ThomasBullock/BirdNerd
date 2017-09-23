import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import slugs from 'slugs';
import * as api from '../api';
import * as actions from '../ducks/photos';
import history from '../history';

function* fetchPhotos(action) {
    try {
        console.log('fetchPhotos in saga!')
        const myPhotos = yield call(api.GET, `photos/${action.query}`);
        // console.log(myPhotos);
        yield put(actions.receivePhotos(myPhotos))
    } catch(error) {
        console.log(error)
    }   
}

export function* watchGetPhotos() {
    yield takeLatest(actions.REQUEST_PHOTOS, fetchPhotos);
}

export default function* rootSaga() {
  yield [
    fork(watchGetPhotos)    
  ];
}