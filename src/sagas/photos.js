import { takeLatest, call, put, select, fork } from 'redux-saga/effects';
import slugs from 'slugs';
import * as api from '../api';
import * as actions from '../ducks/photos';
import { load, loaded } from '../ducks/loading';
import Immutable, { fromJS } from 'immutable';
import history from '../history';
import swal from 'sweetalert'


//selector
const getBirdInfo = (state, birdName) => state.get('bird').filter(bird => bird.get('name') === birdName).get(0);
const getUser = (state) => state.getIn(['auth', 'user', '_id']);
const getGravatar = (state) => state.getIn(['auth', 'user', 'gravatar']);
const getPhoto = (state, photoID ) => state.get('photos').filter(photo => photo.get('_id') === photoID).get(0);

function* fetchPhotos(action) {
    try {
        const myPhotos = yield call(api.GET, `photos/`);
        yield put(actions.receivePhotos(myPhotos))
    } catch(error) {
        console.log(error)
    }   
}

const aspectCalculator = (data) => {
    if(data.width > data.height) {
        return 'Landscape';
    } else if(data.height > data.width) {
        return 'Portrait';
    } else if(data.height === data.width) {
        return 'Square';
    }
}

function* createPhoto(action) {
	try {
		const userPhoto = action.photo.get('files')[0];  //'action' is not defined  no-undef
        if(userPhoto.type !== "image/jpeg") {
            swal('Incorrect file type')
            return
        }
        const formData = new FormData();
        formData.append("file", userPhoto);
        //formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("upload_preset", "ueut3dbz"); 
        formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
        formData.append("timestamp", (Date.now() / 1000) | 0);
        //yield put(actions.createPhotoUpload()); 
        yield put(load());
        const birdImageRes = yield call(api.POSTBIRD, formData); //Post bird on cloudinary
        //get a bird info from redux store
        
        const birdInfo = ( action.photo.get('name') === 'Unknown' ) ? 
        Immutable.Map( { _id: null } )
        : yield select(getBirdInfo, action.photo.get('name'));
        // const birdInfo = yield select(getBirdInfo, action.photo.get('name'));
        console.log('BirdInfo=======',birdInfo)
        const userId = yield select(getUser);
        const userGravatar = yield select(getGravatar);        
        const user = {
            _id: userId,
            gravatar: userGravatar
        }      
        const photoLocation = {
            type: 'Point',
            coordinates: [
                action.photo.get('lng'),
                action.photo.get('lat')
            ],
            address: action.photo.get('address')
        }
        

        const photoInfo = {
            birdName: action.photo.get('name'),
            birdId: birdInfo.get('_id'),
            birdSlug: slugs(action.photo.get('name')),
            location: photoLocation,
            imageAspect: aspectCalculator(birdImageRes),
            comments: [],
            camera: action.photo.get('camera'),
            created_at: birdImageRes.created_at,
            bytes: birdImageRes.bytes,
            format: birdImageRes.format,        
            imageUrl: birdImageRes.secure_url, 
            public_id: birdImageRes.public_id,
            user: user,             
        } 
        console.log('PhotoInfo : =====', photoInfo);  
        yield call(api.POST, 'photo', photoInfo);
        yield put(actions.createPhotoSuccess(photoInfo));
        yield put(loaded());      
        history.push('/bird/mybirds');   	
	} catch(error) {
    	yield console.log(error);		
	}
}

function* deletePhoto(action) {
    console.log(action)
    try {
        const public_id = { public_id: action.public_id}
        const res = yield call(api.DELETE, 'photo', public_id);
        if(!res.err) {
            yield put(actions.deletePhotoSuccess(action.public_id))
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
        // are we liking are unliking?
       
        const operator = (photo.get('likes').includes(userId)) ? '$pull' : '$addToSet';
        console.log(operator)
        const updatePhotoLikes = yield call(api.POST, 'like', {user: userId, photo: action.photo, operator: operator })
        yield put(actions.likePhotoSuccess(Immutable.fromJS(updatePhotoLikes)))
    } catch(error) {
        console.log()
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