import { fork } from 'redux-saga/effects';
import birdSaga from './bird';
import birdListSaga from './birdList';
import photoSaga from './photo';
import photosSaga from './photos';

import authSaga from './auth';

export default function* rootSaga() {
  yield [
    fork(birdSaga),
    fork(birdListSaga),
    fork(photoSaga),
    fork(photosSaga),    
    fork(authSaga),
  ];
}