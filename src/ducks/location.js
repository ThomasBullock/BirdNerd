import { fromJS } from 'immutable';

const action = name => `birdnerd/location/${name}`;


// Actions
export const UPDATE_LOCATION = action('UPDATE_LOCATION');


// Action Creators

export const updateLocation = (location) => ({ type: UPDATE_LOCATION, location});

const initialState = fromJS([
{
  type: 'Point',
  coordinates: [
      null,
      null
  ],
  address: null
}]
);

const location = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LOCATION:
		console.log('Action location :====', action.location);
			return state.push(action.location);	
		default: 
			return state;
	}
	
}

export default location;