import { fromJS } from 'immutable';

// Actions

const action = (name) => `birdnerd/photos/${name}`;

export const REQUEST_PHOTOS = action('REQUEST_PHOTOS');
export const RECEIVE_PHOTOS = action('RECEIVE_PHOTOS');
export const UPLOAD_PHOTO = action('UPLOAD_PHOTO');

// Action creators

export const requestPhotos = (query) => ({ type: REQUEST_PHOTOS, query});
export const receivePhotos = (photos) => ({ type: RECEIVE_PHOTOS, photos });
export const uploadPhoto = (photo) => ({ type: UPLOAD_PHOTO, photo});

const initialState = fromJS([
  {
  	photos: null,
  }
]);

// Reducers

const photos = (state = initialState, action) => {
	switch (action.type) {
    case RECEIVE_PHOTOS: 
    	console.log(action)
      return state.push(action.photos);   
		default:
			return state;		
	} 
};

export default photos;