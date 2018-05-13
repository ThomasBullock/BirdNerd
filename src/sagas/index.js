import { fork } from 'redux-saga/effects';
import birdSaga from './bird';
import photosSaga from './photos';
import uiSaga from './ui';
import usersSaga from './users';
import authSaga from './auth';

export default function* rootSaga() {
  yield [
    fork(birdSaga),
    fork(photosSaga),  
    fork(usersSaga),        
    fork(authSaga),
    fork(uiSaga),    
  ];
}