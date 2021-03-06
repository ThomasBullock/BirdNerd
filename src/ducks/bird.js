import { fromJS } from 'immutable';

const action = name => `birdnerd/bird/${name}`;

export const CREATE_BIRD = action('CREATE_BIRD');
export const UPDATE_BIRD = action('UPDATE_BIRD');
export const UPDATE_BIRD_SUCCESS = action('UPDATE_BIRD_SUCCESS');
export const DELETE_BIRD = action('DELETE_BIRD');
export const DELETE_BIRD_SUCCESS = action('DELETE_BIRD_SUCCESS');
export const CREATE_BIRD_UPLOAD = action('CREATE_BIRD_UPLOAD');
export const CREATE_BIRD_SUCCESS = action('CREATE_BIRD_SUCCESS');

export const REQUEST_BIRD_LIST = action('REQUEST_BIRD_LIST'); 
export const RECEIVE_BIRD_LIST = action('RECEIVE_BIRD_LIST');

// Action Creators
//export const requestBird = (bird) => ({ type: REQUEST_BIRD, bird }); 

export const createBird = bird => ({ type: CREATE_BIRD, bird });

export const updateBird = (bird, birdId)  => ({ type: UPDATE_BIRD, bird, birdId });
export const updateBirdSuccess = bird => ({ type: UPDATE_BIRD_SUCCESS, bird });

export const deleteBird = (_id) => ({ type: DELETE_BIRD, _id });
export const deleteBirdSuccess = (_id) => ({ type: DELETE_BIRD_SUCCESS, _id });

export const createBirdUpload = () => ({ type: CREATE_BIRD_UPLOAD });
export const createBirdSuccess = bird => ({ type: CREATE_BIRD_SUCCESS, bird });

export const requestBirdList = () => ({ type: REQUEST_BIRD_LIST }); 
export const receiveBirdList = (birdList) => ( { type: RECEIVE_BIRD_LIST, birdList });

const initialState = fromJS([
  {
    name: null,
    species: null,
    order: null,
    family: null,
    wingspan: null, 
    location: null,
    conservationStatus: null,
    comments: null,
    created_at: null,
    bytes: null,
    imageAspect: null,    
    imageUrl: null,
    public_id: null, 
  }
]);


// Reducer
const bird = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    // do reducer stuff
    case CREATE_BIRD_UPLOAD:
      console.log('uploading in bird ducks!') 
      return state.push({ uploading: true });
    case CREATE_BIRD_SUCCESS:
      console.log(action);
    	return state.push(fromJS(action.bird));
    case UPDATE_BIRD_SUCCESS:
      return state.update((birdList) => birdList.map(birdObj => (birdObj.get('_id') === action.bird._id) ? fromJS(action.bird) : birdObj));
    case DELETE_BIRD_SUCCESS:
      return state.update((birdList) => birdList.filter(birdObj => birdObj.get('_id') !== action._id));
    case RECEIVE_BIRD_LIST:
      return fromJS(action.birdList);	
    default:
      return state;
  }
};


export default bird;
