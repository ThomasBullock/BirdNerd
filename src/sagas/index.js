import { fork } from 'redux-saga/effects';
import birdSaga from './bird';
import photosSaga from './photos';

import authSaga from './auth';

export default function* rootSaga() {
  yield [
    fork(birdSaga),
    fork(photosSaga),    
    fork(authSaga),
  ];
}