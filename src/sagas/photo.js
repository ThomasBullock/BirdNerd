import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../ducks/photo';
import history from '../history';


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
		const userPhoto = action.photo.get('files')[0];  //'action' is not defined  no-undef
        console.log(userPhoto);
        const formData = new FormData();
        formData.append("file", userPhoto);
        //formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("upload_preset", "ueut3dbz"); 
        formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
        formData.append("timestamp", (Date.now() / 1000) | 0);
        console.log(formData);
        
        const birdImageRes = yield call(api.POSTBIRD, formData);
        
        console.log(birdImageRes); 
        
        const photoInfo = {
            name: action.photo.get('name'),
            location: action.photo.get('location'),
            imageAspect: aspectCalculator(birdImageRes),
            created_at: birdImageRes.created_at,
            bytes: birdImageRes.bytes,
            format: birdImageRes.format,        
            imageUrl: birdImageRes.secure_url,
                        
        }   
        console.log(photoInfo);    	
	} catch(error) {
    	yield console.log(error);		
	}
}

export function* watchUploadPhoto() {
	yield takeLatest(actions.UPLOAD_PHOTO, uploadPhoto);
}

export default function* rootSaga() {
  yield [
    fork(watchUploadPhoto)
  ];
}