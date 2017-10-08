import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import slugs from 'slugs';
import * as api from '../api';
import * as actions from '../ducks/photos';
import history from '../history';

//selector
const getBirdInfo = (state, birdName) => state.get('bird').filter(bird => bird.get('name') === birdName).get(0);

function* fetchPhotos(action) {
    try {
        const myPhotos = yield call(api.GET, `photos/${action.query}`);
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

function* uploadPhoto(action) {
	try {
        debugger;
		const userPhoto = action.photo.get('files')[0];  //'action' is not defined  no-undef
        const formData = new FormData();
        formData.append("file", userPhoto);
        //formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("upload_preset", "ueut3dbz"); 
        formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
        formData.append("timestamp", (Date.now() / 1000) | 0);
        const birdImageRes = yield call(api.POSTBIRD, formData); //Post bird on cloudinary
        //get a bird info from redux store
        const birdInfo = yield select(getBirdInfo, action.photo.get('name'));
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
            camera: action.photo.get('camera'),
            created_at: birdImageRes.created_at,
            bytes: birdImageRes.bytes,
            format: birdImageRes.format,        
            imageUrl: birdImageRes.secure_url,               
        }   
        yield call(api.POST, 'photo', photoInfo);
        history.push('/mybirds/');   	
	} catch(error) {
    	yield console.log(error);		
	}
}

export function* watchUploadPhoto() {
	yield takeLatest(actions.UPLOAD_PHOTO, uploadPhoto);
}

export function* watchGetPhotos() {
    yield takeLatest(actions.REQUEST_PHOTOS, fetchPhotos);
}

export default function* rootSaga() {
  yield [
    fork(watchGetPhotos),
    fork(watchUploadPhoto),
  ];
}