import { fork } from 'redux-saga/effects';
import birdSaga from './bird';
import birdListSaga from './birdList';
import photoSaga from './photo';
import authSaga from './auth';

export default function* rootSaga() {
  yield [
    fork(birdSaga),
    fork(birdListSaga),
    fork(photoSaga),    
    fork(authSaga),
  ];
}