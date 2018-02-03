import { Map } from 'immutable';

const action = name => `birdnerd/auth/${name}`;
const LOAD = action('LOAD');
const LOADED = action('LOADED');

export const load = (message) => ({ type: LOAD, message });
export const loaded = () => ({ type: LOADED });

const initialState = Map({
    currentState: false,
    message: ''
});

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return state.merge({'currentState': true, 'message': action.message});
    case LOADED:
      return state.merge({'currentState': false, 'message': ''});
    default:
      return state;
  }
};

export default loading;
