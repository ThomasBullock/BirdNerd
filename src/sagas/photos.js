import { takeLatest, call, put, select, fork } from 'redux-saga/effects';
import slugs from 'slugs';
import * as api from '../api';
import * as actions from '../ducks/photos';
import { load, loaded } from '../ducks/loading';
import calculateAspectRatios from 'calculate-aspect-ratio';
import Immutable from 'immutable';
import history from '../history';
import swal from 'sweetalert'


//selector
const getLoadingStatus = (state) => state.getIn(['loading', 'currentState']);
const getBirdInfo = (state, birdName) => state.get('bird').filter(bird => bird.get('name') === birdName).get(0);
const getUser = (state) => state.getIn(['auth', 'user', '_id']);
const getGravatar = (state) => state.getIn(['auth', 'user', 'gravatar']);
const getUserName = (state) => state.getIn(['auth', 'user', 'userName']);
const getUserFirst = (state) => state.getIn(['auth', 'user', 'firstName']); // not currently used
const getUserSurname = (state) => state.getIn(['auth', 'user', 'lastName']); // not currently used

const getPhoto = (state, photoID ) => state.get('photos').filter(photo => photo.get('_id') === photoID).get(0);


function* fetchPhotos(action) {
    try {
        yield put(load('Loading Photos'));
        const query = (action.id) ? `birds/${action.id}/photos` : `photos/?${action.query}`;        
        const myPhotos = yield call(api.GET, query);
        yield put(loaded());                  
        yield put(actions.receivePhotos(myPhotos));
    } catch(error) {
        // need to try a redirect here
        console.log(error)
        history.push(`/`);
    }   
}

function* createPhoto(action) {
	try {
		const userPhoto = action.photo.get('files')[0];  //'action' is not defined  no-undef
        if(userPhoto.type !== "image/jpeg") {
            swal('Incorrect file type')
            return
        }
        console.log(userPhoto)
        const formData = new FormData();
        formData.append("file", userPhoto);
        //formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("upload_preset", "ueut3dbz"); 
        formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
        formData.append("timestamp", (Date.now() / 1000) | 0);
        //yield put(actions.createPhotoUpload()); 
        yield put(load('Uploading Photo'));
        const birdImageRes = yield call(api.POSTBIRD, formData); //Post bird on cloudinary
        //get a bird info from redux store
        
        const birdInfo = ( action.photo.get('name') === 'Unknown' ) ? 
        Immutable.Map( { _id: null } )
        : yield select(getBirdInfo, action.photo.get('name'));
        // const birdInfo = yield select(getBirdInfo, action.photo.get('name'));
        console.log('BirdInfo=======',birdInfo)
        const userId = yield select(getUser);

        // Have moved user list into state so _id is the only thing needed to identify photo creator 
        // and gravatar name etc will be accessed from users

        // const userGravatar = yield select(getGravatar);
        // const userName = yield select(getUserName);
        // const userFirst = yield select(getUserFirst);        
        // const userSurname = yield select(getUserSurname);        
        const user = {
            _id: userId,
            // gravatar: userGravatar,
            // userName: userName
        }      
        const photoLocation = {
            type: 'Point',
            coordinates: [
                action.photo.get('lng'),
                action.photo.get('lat')
            ],
            address: action.photo.get('address')
        }
        
        const dateTaken = (action.photo.get('dateTaken')) ? action.photo.get('dateTaken') : new Date(userPhoto.lastModified)

        const photoInfo = {
            birdName: action.photo.get('name'),
            birdId: birdInfo.get('_id'),
            birdSlug: slugs(action.photo.get('name')),
            location: photoLocation,
            comments: [],
            camera: action.photo.get('camera'),
            created_at: birdImageRes.created_at,
            dateTaken: dateTaken,
            bytes: birdImageRes.bytes,
            format: birdImageRes.format,        
            imageAspect: calculateAspectRatios(birdImageRes.width, birdImageRes.height),
            imageUrl: birdImageRes.secure_url, 
            public_id: birdImageRes.public_id,
            user: user,             
        } 
        console.log('PhotoInfo : =====', photoInfo);  
        const res = yield call(api.POST, 'photo', photoInfo);
        yield put(actions.createPhotoSuccess(res.data));
        yield put(loaded());      
        history.push('/bird/mybirds');   	
	} catch(error) {
    	yield console.log(error);		
	}
}

function* deletePhoto(action) {
    // get router info if on photo:id then history push to my photos
    console.log(action)
    try {
        const public_id = { public_id: action._id}
        const res = yield call(api.DELETE, `photos/${action._id}`);
        if(!res.error) {
            history.push('/bird/feed');  
            yield put(actions.deletePhotoSuccess(action._id));
        } 
           
    } catch(error) {
        console.log(error);
    }
}

function* likePhoto(action) {
    console.log(action.photo)
    
    try {
        const photo = yield select(getPhoto, action.photo);
        const userId = yield select(getUser);
        if(!userId) {
            throw('You must be logged in to do that');
        }
        // are we liking are unliking?
       
        const operator = (photo.get('likes').includes(userId)) ? '$pull' : '$addToSet';
        console.log(action.photo)
        const updatePhotoLikes = yield call(api.PUT, `photos/${action.photo}/like`, {user: userId, operator: operator })
        yield put(actions.likePhotoSuccess(Immutable.fromJS(updatePhotoLikes)))
    } catch(error) {
        console.log(error)
    }
}

export function* watchCreatePhoto() {
	yield takeLatest(actions.CREATE_PHOTO, createPhoto);
}

export function* watchGetPhotos() {
    yield takeLatest(actions.REQUEST_PHOTOS, fetchPhotos);
}

export function* watchDeletePhoto() {
    yield takeLatest(actions.DELETE_PHOTO, deletePhoto);
}

export function* watchLikePhoto() {
    yield takeLatest(actions.LIKE_PHOTO, likePhoto);
}

export default function* rootSaga() {
  yield [
    fork(watchGetPhotos),
    fork(watchCreatePhoto),
    fork(watchDeletePhoto),
    fork(watchLikePhoto)
  ];
}