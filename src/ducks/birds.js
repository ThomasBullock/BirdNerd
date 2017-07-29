import { Map } from 'immutable';

const action = name => `birdnerd/bird/${name}`;

export const FETCH_BIRD = action('FETCH_BIRD');
export const CREATE_BIRD = action('CREATE_BIRD');
export const UPDATE_BIRD = action('UPDATE_BIRD');
export const REMOVE_BIRD = action('REMOVE_BIRD');

// Action Creators
export const fetchBird = () => ({ type: FETCH_BIRD });

export const createBird = bird => ({ type: CREATE_BIRD, bird });

export const updateBird = bird => ({ type: UPDATE_BIRD, bird });

export const removeBird = bird => ({ type: REMOVE_BIRD, bird });


const initialState = Map({});

// Reducer
const bird = (state = initialState, action) => {
  switch (action.type) {
    // do reducer stuff
    case FETCH_BIRD: 
      //Todo
    	return state;
    case CREATE_BIRD:
    //Todo
    	return state;
    case UPDATE_BIRD:
      //Todo	
    	return state;
    case REMOVE_BIRD:
      //Todo
    	return state;		
    default:
      return state;
  }
};

export default bird;
