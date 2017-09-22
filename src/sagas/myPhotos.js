import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import slugs from 'slugs';
import * as api from '../api';
import * as actions from '../ducks/myPhotos';
import history from '../history';

function* fetchMyPhotos(action) {
    try {
    		console.log('fetchMyPhotos in saga!')
        const myPhotos = yield call(api.GET, `myphotos/`);
        console.log(myPhotos);
        yield put(actions.receiveMyPhotos(myPhotos))
    } catch(error) {
        console.log(error)
    }   
}

export function* watchGetMyPhotos() {
    yield takeLatest(actions.REQUEST_MY_PHOTOS, fetchMyPhotos);
}

export default function* rootSaga() {
  yield [
    fork(watchGetMyPhotos)    
  ];
}