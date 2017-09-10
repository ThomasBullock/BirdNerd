import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../ducks/birdList';

function* fetchBirdList(action) {
  console.log('fetch birdList generator')
  try {
    const birdList = yield call(api.GET, `birds/`)
    console.log(birdList)
    yield put(actions.receiveBirdList(birdList))
  } catch(error) {
    console.log(error)
  }
}

export function* watchFetchBirdList() {
  yield takeLatest(actions.REQUEST_BIRD_LIST, fetchBirdList);
}

export default function* rootSaga() {
  yield [
    fork(watchFetchBirdList)
  ];
}