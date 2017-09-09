import { fromJS } from 'immutable';

const action = name => `birdnerd/bird/${name}`;

export const REQUEST_BIRD = action('REQUEST_BIRD'); // need to create request and receive
export const RECEIVE_BIRD = action('RECEIVE_BIRD');
// export const REQUEST_BIRD_LIST = action('REQUEST_BIRD_LIST'); // need to create request and receive
// export const RECEIVE_BIRD_LIST = action('RECEIVE_BIRD_LIST');
export const CREATE_BIRD = action('CREATE_BIRD');
export const UPDATE_BIRD = action('UPDATE_BIRD');
export const REMOVE_BIRD = action('REMOVE_BIRD');
export const CREATE_BIRD_SUCCESS = action('CREATE_BIRD_SUCCESS');

// Action Creators
export const requestBird = (bird) => ({ type: REQUEST_BIRD, bird }); 

export const receiveBird = (data) => ( { type: RECEIVE_BIRD, data });

// export const requestBirdList = () => ({ type: REQUEST_BIRD_LIST }); 

// export const receiveBirdList = (birdList) => ( { type: RECEIVE_BIRD_LIST, birdList });

export const createBird = bird => ({ type: CREATE_BIRD, bird });

export const updateBird = bird => ({ type: UPDATE_BIRD, bird });

export const removeBird = bird => ({ type: REMOVE_BIRD, bird });

export const createBirdSuccess = bird => ({ type: CREATE_BIRD_SUCCESS, bird });

const initialState = fromJS([
  {
    name: null,
    species: null,
    order: null,
    location: null,
    conservationStatus: null,
    comments: null,
    created_at: null,
    bytes: null,
    imageUrl: null,
  }
]);


// Reducer
const bird = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    // do reducer stuff
    case RECEIVE_BIRD: 
      //Todo
      console.log(action.data)
      return state.push(fromJS(action.data));      
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
