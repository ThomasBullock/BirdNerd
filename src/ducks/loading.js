import { Map } from 'immutable';

const action = name => `birdnerd/auth/${name}`;
const LOAD = action('LOAD');
const LOADED = action('LOADED');

export const load = () => ({ type: LOAD });
export const loaded = () => ({ type: LOADED });

const initialState = Map({
    currentState: false,
});

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return state.set('currentState', true);

    case LOADED:
      return state.set('currentState', false);

    default:
      return state;
  }
};

export default loading;
