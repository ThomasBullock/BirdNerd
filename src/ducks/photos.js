import { fromJS } from 'immutable';

// Actions

const action = (name) => `birdnerd/photos/${name}`;

export const REQUEST_PHOTOS = action('REQUEST_PHOTOS');
export const RECEIVE_PHOTOS = action('RECEIVE_PHOTOS');
export const CREATE_PHOTO = action('CREATE_PHOTO');
export const CREATE_PHOTO_SUCCESS = action('CREATE_PHOTO_SUCCESS');
export const DELETE_PHOTO = action('DELETE_PHOTO');
export const DELETE_PHOTO_SUCCESS = action('DELETE_PHOTO_SUCCESS');
export const SORT_NEWEST = action('SORT_NEWEST');
export const SORT_OLDEST = action('SORT_OLDEST');
export const SORT_POPULAR = action('SORT_POPULAR');
export const LIKE_PHOTO = action('LIKE_PHOTO');
export const LIKE_PHOTO_SUCCESS = action('LIKE_PHOTO_SUCCESS');

// Action creators

export const requestPhotos = (query) => ({ type: REQUEST_PHOTOS, query});
export const receivePhotos = (photos) => ({ type: RECEIVE_PHOTOS, photos });
export const createPhoto = (photo) => ({ type: CREATE_PHOTO, photo});
export const createPhotoSuccess = (photo) => ({ type: CREATE_PHOTO_SUCCESS, photo});
export const deletePhoto = public_id => ({ type: DELETE_PHOTO, public_id});
export const deletePhotoSuccess = public_id => ({ type: DELETE_PHOTO_SUCCESS, public_id});
export const sortNewest = () => ({ type: SORT_NEWEST});
export const sortOldest = () => ({ type: SORT_OLDEST});
export const sortPopular = () => ({ type: SORT_POPULAR});
export const likePhoto = (photo) => ({ type: LIKE_PHOTO, photo});
export const likePhotoSuccess = (photo) => ({type: LIKE_PHOTO_SUCCESS, photo})

const initialState = fromJS([
	{
		birdName: null,
		birdSlug: null,
		camera: null,
		created_at: null,
		bytes: null,
		user: null,
		imageAspect: null,
		comments: [], 
		imageUrl: null,
		birdId: null,
		location: {},
		format: null,
		_id: null,
		likes: [],
		public_id: null,
	}
]);

// Reducers

const photos = (state = initialState, action) => {
	// console.log(action)
	switch (action.type) {
    case CREATE_PHOTO_SUCCESS: 
    	return state.unshift(fromJS(action.photo));  		
    case RECEIVE_PHOTOS:
    	const photos = fromJS(action.photos)
      return photos.sortBy(item => item.created_at).reverse(); // default the order of photos to be newest first - do we need to??
    case SORT_NEWEST:
    	return state.sort( (a, b) => Date.parse(b.get('created_at')) - Date.parse(a.get('created_at')) );;
    case SORT_OLDEST:
    	return state.sort( (a, b) => Date.parse(a.get('created_at')) - Date.parse(b.get('created_at')) );
    case SORT_POPULAR:
		return state.sort( (a, b) => a.get('likes').size - b.get('likes').size).reverse();
	case DELETE_PHOTO_SUCCESS:
		return state.update((photoList) => photoList.filter(photoObj => photoObj.get('public_id') !== action.public_id));
	case LIKE_PHOTO_SUCCESS:
		return state.update((photoList) => photoList
			.map(photoObj => (photoObj.get('_id') === action.photo.get('_id')) ? photoObj.set('likes', action.photo.get('likes')) : photoObj ))	
		default:
			return state;		
	} 
};

export default photos;