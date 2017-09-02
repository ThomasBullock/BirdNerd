import { fromJS } from 'immutable';

const action = name => `birdnerd/bird/${name}`;

export const FETCH_BIRD = action('FETCH_BIRD');
export const CREATE_BIRD = action('CREATE_BIRD');
export const UPDATE_BIRD = action('UPDATE_BIRD');
export const REMOVE_BIRD = action('REMOVE_BIRD');
export const CREATE_BIRD_SUCCESS = action('CREATE_BIRD_SUCCESS');
console.log(FETCH_BIRD);
// Action Creators
export const fetchBird = bird => ({ type: FETCH_BIRD, bird });

export const createBird = bird => ({ type: CREATE_BIRD, bird });

export const updateBird = bird => ({ type: UPDATE_BIRD, bird });

export const removeBird = bird => ({ type: REMOVE_BIRD, bird });

export const createBirdSuccess = bird => ({ type: CREATE_BIRD_SUCCESS, bird });

console.log(fetchBird('eagle'));
const initialState = fromJS([
  {
    name: null,
    species: null,
    location: null,
    conservationStatus: null,
    created_at: null,
    bytes: null,
    imageUrl: null,
  }
]);

// Reducer
const bird = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    // do reducer stuff
    case FETCH_BIRD: 
      //Todo
      console.log('fetch bird action')
      return state.push(action.bird);      
    case CREATE_BIRD_SUCCESS:
    	return state.push(action.bird);
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
