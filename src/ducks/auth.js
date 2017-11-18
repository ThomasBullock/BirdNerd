import { Map } from 'immutable';

const action = name => `birdnerd/auth/${name}`;

export const AUTH_USER = action('AUTH_USER');  
export const UNAUTH_USER = action('UNAUTH_USER');
export const AUTH_ERROR = action('AUTH_ERROR');
export const FORGOT_PASSWORD_REQUEST = action('FORGOT_PASSWORD_REQUEST');
export const FORGOT_PASSWORD_SUCCESS = action('FORGOT_PASSWORD_SUCCESS');
export const RESET_PASSWORD_REQUEST = action('RESET_PASSWORD_REQUEST');
export const CHANGE_PASSWORD = action('CHANGE_PASSWORD');
export const CHANGE_PASSWORD_SUCCESS = action('CHANGE_PASSWORD_SUCCESS');
export const PROTECTED_TEST = action('PROTECTED_TEST');
export const PROTECTED_TEST_SUCCESS = action('PROTECTED_TEST_SUCCESS');
export const LOGIN_REQUEST = action('LOGIN_REQUEST');
export const SIGN_UP_REQUEST = action('SIGN_UP_REQUEST');
export const LOGIN_FAILURE = action('LOGIN_FAILURE');
export const UPLOADING_IMAGE = action('UPLOADING_IMAGE');
export const UPLOAD_COMPLETE = action('UPLOAD_COMPLETE');


export const authUser = (user) => ({ type: AUTH_USER, user });
export const unAuthUser = () => ({ type: UNAUTH_USER });
export const protectedTest = () => ({ type: PROTECTED_TEST });
export const protectedTestSuccess = (payload) => ({ type: PROTECTED_TEST_SUCCESS, payload }) 
export const signUpRequest = user => ({ type: SIGN_UP_REQUEST, user });
export const loginRequest = user => ({ type: LOGIN_REQUEST, user });
export const loginFail = error => ({ type: LOGIN_FAILURE, error });
export const forgotPasswordRequest = (user) => ({ type: FORGOT_PASSWORD_REQUEST, user });
export const forgotPasswordSuccess =  (user) => ({ type: FORGOT_PASSWORD_SUCCESS, user });
export const resetPasswordRequest = (token) => ({ type: RESET_PASSWORD_REQUEST, token });
export const changePassword = (password, user) => ({ type: CHANGE_PASSWORD, password, user });
export const changePasswordSuccess = (user) => ({ type: CHANGE_PASSWORD_SUCCESS, user});
export const uploadingImage = () => ({ type: UPLOADING_IMAGE });
export const uploadComplete = () => ({ type: UPLOAD_COMPLETE })


const INITIAL_STATE = Map({
  error: '',
  message: '',
  content: '',
  authenticated: false,
  user: null,
  uploading: false
});

let decoded;

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return state.merge({ error: '', message: '', authenticated: true, user: action.user });
    case UNAUTH_USER:
      return state.merge({ authenticated: false });
    case AUTH_ERROR:
      return state.merge({ error: action.payload });
    case PROTECTED_TEST_SUCCESS:
      return state.merge({ content: action.payload });

    case LOGIN_FAILURE:
      console.log(action.error);
      return state.set('error', action.error);
    case FORGOT_PASSWORD_SUCCESS: 
      return state.merge({ error: '', message: 'password reset email sent', authenticated: false, user: null });    
    case CHANGE_PASSWORD_SUCCESS: 
      return state.merge({ error: '', message: 'Password succesfully updated', authenticated: true, user: action.user });      
    case UPLOADING_IMAGE: 
      return state.merge({ uploading: true });    
    case UPLOAD_COMPLETE: 
      return state.merge({ uploading: false });  
    default:
      return state;
  }
};

export default auth;