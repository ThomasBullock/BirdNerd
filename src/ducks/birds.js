// widgets.js

// Actions
const FETCH_BIRD   = 'FETCH_BIRD';
const CREATE_BIRD = 'CREATE_BIRD';
const UPDATE_BIRD = 'UPDATE_BIRD';
const REMOVE_BIRD = 'REMOVE_BIRD';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case 'FETCH_BIRD': 
    	return action.birds;
    case 'CREATE_BIRD':
    	return action.bird;
    case 'UPDATE_BIRD':	
    	return action.bird;
    case 'REMOVE_BIRD':
    	return action.bird;		
    default: return state;
  }
}

// Action Creators
export function fetchBird() {
  return { type: FETCH_BIRD };
}

export function createBird(bird) {
  return { type: CREATE_BIRD, bird };
}

export function updateBird(bird) {
  return { type: UPDATE_BIRD, bird };
}

export function removeBird(bird) {
  return { type: REMOVE_BIRD, bird };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(setWidget(widget)))
// }
