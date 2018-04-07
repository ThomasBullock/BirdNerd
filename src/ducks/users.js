import { fromJS } from 'immutable';

const action = name => `birdnerd/user/${name}`;

export const REQUEST_USERS = action('REQUEST_USERS');  
export const RECEIVE_USERS = action('RECEIVE_USERS');

export const requestUsers = () => ({ type: REQUEST_USERS});
export const receiveUsers = (users) => ({ type: RECEIVE_USERS, users });



const initialState = fromJS({

});


const users = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return fromJS(action.users); 
    default:
      return state;
  }
};

export default users;