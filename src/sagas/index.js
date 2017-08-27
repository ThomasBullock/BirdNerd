import { fork } from 'redux-saga/effects';
import birdSaga from './bird';
import authSaga from './auth';

export default function* rootSaga() {
  yield [
    fork(birdSaga),
    fork(authSaga),
  ];
}