import { Map } from 'immutable';
//import jwtDecode from 'jwt-decode';

const action = name => `birdnerd/auth/${name}`;

export const AUTH_USER = action('AUTH_USER');  
export const UNAUTH_USER = action('UNAUTH_USER');
export const AUTH_ERROR = action('AUTH_ERROR');
export const FORGOT_PASSWORD_REQUEST = action('FORGOT_PASSWORD_REQUEST');
export const RESET_PASSWORD_REQUEST = action('RESET_PASSWORD_REQUEST');
export const PROTECTED_TEST = action('PROTECTED_TEST');
export const PROTECTED_TEST_SUCCESS = action('PROTECTED_TEST_SUCCESS');
export const LOGIN_REQUEST = action('LOGIN_REQUEST');
export const SIGN_UP_REQUEST = action('SIGN_UP_REQUEST');
export const LOGIN_FAILURE = action('LOGIN_FAILURE');

export const authUser = () => ({ type: AUTH_USER });
export const unAuthUser = () => ({ type: UNAUTH_USER });
export const protectedTest = () => ({ type: PROTECTED_TEST });
export const protectedTestSuccess = (payload) => ({ type: PROTECTED_TEST_SUCCESS, payload }) 
export const signUpRequest = user => ({ type: SIGN_UP_REQUEST, user });
export const loginRequest = user => ({ type: LOGIN_REQUEST, user });
export const loginFail = error => ({ type: LOGIN_FAILURE, error });
// export const loginSuccess = token => ({ type: LOGIN_SUCCESS, token });
// export const logout = () => ({ type: LOGOUT });

const INITIAL_STATE = Map({
  error: '',
  message: '',
  content: '',
  authenticated: false,
});

let decoded;

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return state.merge({ error: '', message: '', authenticated: true });
    case UNAUTH_USER:
      console.log('Action is : ', action);
      return state.merge({ authenticated: false });
    case AUTH_ERROR:
      return state.merge({ error: action.payload });
    case PROTECTED_TEST_SUCCESS:
      return state.merge({ content: action.payload });
    // case LOGIN_SUCCESS || SIGN_UP_SUCCESS:
    //   decoded = jwtDecode(action.token);
    //   console.log(action.token);
    //   return state.merge({
    //     authenticated: true,
    //     token: action.token,
    //     id: decoded._id,
    //     role: decoded.role,
    //     organisation: decoded.organisation,
    //   });

    case LOGIN_FAILURE:
      console.log(action.error);
      return state.set('error', action.error);

    // case LOGOUT:
    //   return state.clear();

    default:
      return state;
  }
};

export default auth;