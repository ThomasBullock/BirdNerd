import { fromJS } from 'immutable';

// Actions

const action = (name) => `birdnerd/photos/${name}`;

export const REQUEST_MY_PHOTOS = action('REQUEST_MY_PHOTOS');
export const RECEIVE_MY_PHOTOS = action('RECEIVE_MY_PHOTOS');


// Action creators

export const requestMyPhotos = () => ({ type: REQUEST_MY_PHOTOS});
export const receiveMyPhotos = (myPhotos) => ({ type: RECEIVE_MY_PHOTOS, myPhotos });


const initialState = fromJS([
  {
  	myPhotos: null
  }
]);

// Reducers

const myPhotos = (state = initialState, action) => {
	switch (action.type) {
    case RECEIVE_MY_PHOTOS: 
    	// console.log(action)
      return state.push(action.myPhotos);   
		default:
			return state;		
	} 
};

export default myPhotos;