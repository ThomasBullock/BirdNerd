import { fromJS } from 'immutable';


// Actions

const action = (name) => `birdnerd/photo/${name}`;


export const UPLOAD_PHOTO = action('UPLOAD_PHOTO');
export const UPDATE_LOCATION = action('UPDATE_LOCATION');

// Action Creators

export const uploadPhoto = (photo) => ({ type: UPLOAD_PHOTO, photo});
export const updateLocation = (location) => ({ type: UPDATE_LOCATION, location})


const initialState = fromJS([
  {
  	user: null,
    name: null,
    birdnerd: null,
    location: null,
		likes: null,
		camera: null,
		imageAspect: null,
		imageUrl: null,
    comments: null,
    created_at: null,
    bytes: null,
    format: null
  }
]);

// Reducers

const photo = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_PHOTO: 
			return state;
		case UPDATE_LOCATION:
			state.location
		default:
			return state;		
	} 
};

export default photo;
