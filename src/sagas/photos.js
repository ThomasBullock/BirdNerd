import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import slugs from 'slugs';
import * as api from '../api';
import * as actions from '../ducks/photos';
import { load, loaded } from '../ducks/loading';
import Immutable from 'immutable';
import history from '../history';

//selector
const getBirdInfo = (state, birdName) => state.get('bird').filter(bird => bird.get('name') === birdName).get(0);
const getUser = (state) => state.getIn(['auth', 'user', '_id']);

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
        console.log(action)
	try {
		const userPhoto = action.photo.get('files')[0];  //'action' is not defined  no-undef
        const formData = new FormData();
        formData.append("file", userPhoto);
        //formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("upload_preset", "ueut3dbz"); 
        formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
        formData.append("timestamp", (Date.now() / 1000) | 0);
        //yield put(actions.createPhotoUpload()); 
        yield put(load());
        const birdImageRes = yield call(api.POSTBIRD, formData); //Post bird on cloudinary
        console.log('Cloudinary Res : ', birdImageRes);
        //get a bird info from redux store
        
        const birdInfo = ( action.photo.get('name') === 'Unknown' ) ? 
        Immutable.Map( { _id: null } )
        : yield select(getBirdInfo, action.photo.get('name'));
        // const birdInfo = yield select(getBirdInfo, action.photo.get('name'));
        console.log(birdInfo)
        const user = yield select(getUser);
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
        yield call(api.POST, 'photo', photoInfo);
        yield put(actions.createPhotoSuccess(photoInfo));
        yield put(loaded());      
        history.push('/bird/mybirds');   	
	} catch(error) {
    	yield console.log(error);		
	}
}

function* deletePhoto(action) {
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

export function* watchCreatePhoto() {
	yield takeLatest(actions.CREATE_PHOTO, createPhoto);
}

export function* watchGetPhotos() {
    yield takeLatest(actions.REQUEST_PHOTOS, fetchPhotos);
}

export function* watchDeletePhoto() {
    yield takeLatest(actions.DELETE_PHOTO, deletePhoto);
}

export default function* rootSaga() {
  yield [
    fork(watchGetPhotos),
    fork(watchCreatePhoto),
    fork(watchDeletePhoto),
  ];
}