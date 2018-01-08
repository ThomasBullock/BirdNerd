import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import * as api from '../api';
import * as actions from '../ducks/auth';
import history from '../history';
import swal from 'sweetalert'
//import { newError } from 'ducks/alerts';
const AUTH_BASE_URL = (process.env.NODE_ENV === 'production') ? 'http://birdnerd.club/api/auth/' : 'http://localhost:3001/api/auth/';
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
    swal('Incorrect details')
    yield put(actions.loginFail('Incorrect details'));
  }
}

function* forgotPasswordRequest(action) {
   console.log(action.user)
   try {
      const response = yield call(authFetch, 'forgot', action.user);
      if(response.status >= 200 && response.status < 300) {
        yield put(actions.forgotPasswordSuccess(action.user));
      }      
   } catch (error) {
     yield console.log(error);
   }
}

function* resetPasswordRequest(action) {
   console.log(action.token)
   try {
    const response = yield call(authFetch, `reset`, action);
    console.log(response.status);
    if(response.status >= 200 && response.status < 300) {
      const user = yield response.json();
      yield put(actions.authUser(user.user));      
      console.log(user)      
    } else {
      history.push('/404');
    }

   } catch (error) {
    yield console.log(error)
   } 
}

function* changePassword(action) {
  console.log(action)
  console.log(action.user.get('_id'))
  try {
    console.log('we will update teh password');
    const response = yield call(authFetch, `changepassword`, action)
    console.log(response.status)
    if(response.status >= 200 && response.status < 300) {
      yield put(actions.changePasswordSuccess(action.user));
    }
  } catch(error) {
    yield console.log(error)
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

export function* watchForgotPasswordRequest() {
  yield takeLatest(actions.FORGOT_PASSWORD_REQUEST, forgotPasswordRequest);
}

export function* watchResetPasswordRequest() {
  yield takeLatest(actions.RESET_PASSWORD_REQUEST, resetPasswordRequest);
}

export function* watchChangePassword() {
  yield takeLatest(actions.CHANGE_PASSWORD, changePassword);
}

export function* watchProtectedTest() {
  yield takeLatest(actions.PROTECTED_TEST, protectedTest);
}

export default function* rootSaga() {
  yield [
    fork(watchProtectedTest), 
    fork(watchLoginRequest), 
    fork(watchSignUpRequest), 
    fork(watchForgotPasswordRequest), 
    fork(watchResetPasswordRequest),
    fork(watchChangePassword)
  ];
}