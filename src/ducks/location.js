import { fromJS } from 'immutable';

const action = name => `birdnerd/location/${name}`;


// Actions
export const UPDATE_LOCATION = action('UPDATE_LOCATION');


// Action Creators

export const updateLocation = (location) => ({ type: UPDATE_LOCATION, location});

const initialState = fromJS({
	currentLocation: null,
})

const location = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LOCATION:
			return state.set('currentLocation', fromJS(action.location));	
		default: 
			return state;
	}
	
}

export default location;