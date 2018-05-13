import { takeLatest, call, put, fork } from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../ducks/users';
import history from '../history';
import swal from 'sweetalert'
import { load, loaded } from '../ducks/loading';
import { mapValues, keyBy } from 'lodash';
import { indexBy } from '../clientHelpers';

function* fetchUsers(action) {
  try {
    const userList = yield call(api.GET, `users`)
    const usersAsMap = keyBy(userList, '_id');
    yield put(actions.receiveUsers(usersAsMap));
  } catch(error) {
    console.log(error)
  }
}

export function* watchFetchUsers() {
  yield takeLatest(actions.REQUEST_USERS, fetchUsers);
}

export default function* rootSaga() {
  yield [
    fork(watchFetchUsers), 
  ];
}