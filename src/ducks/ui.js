import { fromJS } from 'immutable';

// Actions

const action = (name) => `birdnerd/ui/${name}`;

export const REQUEST_PHOTO_LIST_LENGTH = action(' REQUEST_PHOTO_LIST_LENGTH');
export const RECEIVE_PHOTO_LIST_LENGTH = action('RECEIVE_PHOTO_LIST_LENGTH');
export const TOGGLE_DRAWER = action('TOGGLE_DRAWER');
export const SET_PAGINATION_PAGE = action('SET_PAGINATION_PAGE');

// Action creators

export const requestPhotoListLength = () => ({ type: REQUEST_PHOTO_LIST_LENGTH,});
export const receivePhotoListLength = (length) => ({ type: RECEIVE_PHOTO_LIST_LENGTH, length });
export const toggleDrawer = () => ({ type: TOGGLE_DRAWER});
export const setPaginationPage = (pageNumber, page) => ({ type: SET_PAGINATION_PAGE, pageNumber, page})


const initialState = fromJS(
	{
		drawerOpen: false,
		photosPerPage: 6,
		feedPage: 0,
		myPhotosPage: 0,
	}
);

// Reducers

const ui = (state = initialState, action) => {
	switch (action.type) {
	case RECEIVE_PHOTO_LIST_LENGTH: 
		console.log(action)
    	return state.update('photoListLength', (value) => action.length);  		
    case TOGGLE_DRAWER:
		return state;
	case SET_PAGINATION_PAGE:
		return state.update(action.page, (value) => action.pageNumber);  			
	default:
		return state;		
	} 
};

export default ui;