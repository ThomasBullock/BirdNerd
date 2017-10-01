import { fromJS } from 'immutable';


// Actions

const action = (name) => `birdnerd/photo/${name}`;


export const UPLOAD_PHOTO = action('UPLOAD_PHOTO');

// Action Creators

//export const uploadPhoto = (photo) => ({ type: UPLOAD_PHOTO, photo});

const initialState = fromJS(
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
);

// Reducers

const photo = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_PHOTO: 
			return state;
		default:
			return state;		
	} 
};

export default photo;
