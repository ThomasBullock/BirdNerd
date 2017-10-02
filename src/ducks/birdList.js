import { fromJS } from 'immutable';

const action = name => `birdnerd/bird/${name}`;

export const REQUEST_BIRD_LIST = action('REQUEST_BIRD_LIST'); 
export const RECEIVE_BIRD_LIST = action('RECEIVE_BIRD_LIST');

//export const requestBirdList = () => ({ type: REQUEST_BIRD_LIST }); 
//export const receiveBirdList = (birdList) => ( { type: RECEIVE_BIRD_LIST, birdList });

const initialState = fromJS([
  {
    birds: null
  }
]);

const birdList = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    // do reducer stuff
    case RECEIVE_BIRD_LIST: 
    	// console.log(action)
      return state.push(action.birdList);      
    default:
      return state;
  }
};

export default birdList;
