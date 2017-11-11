import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import * as api from '../api';
import * as actions from '../ducks/auth';
import history from '../history';
//import { newError } from 'ducks/alerts';
const AUTH_BASE_URL = 'http://localhost:3001/api/auth/';
const CLIENT_ROOT_URL =  'http://localhost:3000/'

function authFetch(url, body) {
  return fetch(AUTH_BASE_URL + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );
}

function* signUpRequest(action) {
  try {
    const response = yield call(authFetch, 'register', action.user);
    if (response.status >= 200 && response.status < 300) {
      const user = yield response.json();
      yield window.sessionStorage.setItem('token', user.token);
      yield put(actions.authUser());
      history.push('/');
    } else {
      throw response;
    }
  } catch (error) {
    yield console.log(error);
  }
}

function* loginRequest(action) {
  console.log(action)
  try {
    const response = yield call(authFetch, 'login', action.user);
    if (response.status >= 200 && response.status < 300) {
      const user = yield response.json();
      console.log("Response: ====", user)
      yield window.sessionStorage.setItem('token', user.token);
      yield put(actions.authUser(user.user));
      history.push('/');
    } else {
      throw response;
    }
  } catch (error) {
    yield console.log(error);
    yield put(actions.loginFail('Incorrect details'));
  }
}

function* protectedTest(action) {
  console.log('Protectedtest in saga');
  try {
    const response = yield call(api.GET, 'protected');
    console.log(response);
    yield put(actions.protectedTestSuccess(response));
  } catch (error) {
    console.log('Failed Protected Test');
    yield console.log(error);
  }
}

export function* watchSignUpRequest() {
  yield takeLatest(actions.SIGN_UP_REQUEST, signUpRequest);
}

export function* watchLoginRequest() {
  yield takeLatest(actions.LOGIN_REQUEST, loginRequest);
}

export function* watchProtectedTest() {
  yield takeLatest(actions.PROTECTED_TEST, protectedTest);
}

export default function* rootSaga() {
  yield [fork(watchProtectedTest), fork(watchLoginRequest), fork(watchSignUpRequest)];
}