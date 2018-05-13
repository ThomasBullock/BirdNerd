import { takeLatest, call, put, select, fork } from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../ducks/ui';

function* fetchPhotoListLength(action) {
    console.log('in ui saga')
    const photoListLength = yield call(api.GET, `birds/photos`);
    console.log(photoListLength)
    yield put(actions.receivePhotoListLength(photoListLength))
}

export function* watchFetchPhotoListLength() {
    yield takeLatest(actions.REQUEST_PHOTO_LIST_LENGTH, fetchPhotoListLength);
}

export default function* rootSaga() {
    yield [
      fork(watchFetchPhotoListLength),
    ];
  }