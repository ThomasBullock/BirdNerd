import { fork } from 'redux-saga/effects';
import birdSaga from './bird';

export default function* rootSaga() {
  yield [
    fork(birdSaga),
  ];
}