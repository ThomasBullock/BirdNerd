import slugs from 'slugs';
import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../ducks/bird';
import { load, loaded } from '../ducks/loading';
import swal from 'sweetalert'
import calculateAspectRatios from 'calculate-aspect-ratio';
import history from '../history';
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import store from '../store';

function* fetchBird(action) {
  try {
    //const bird = yield call(api.GET, `birds/${action.bird}`);
    //yield put(actions.receiveBird(bird))
  } catch(error) {
    yield console.log(error);
  }
}

function* createBird(action) {
  try {    
    const birdImage = action.bird.get('files')[0];
    if(birdImage.type !== "image/jpeg") {
        swal('Incorrect file type')
        return
    }    
    console.log(action.bird)
    const formData = new FormData();
    formData.append("file", birdImage);
    //formData.append("tags", `codeinfuse, medium, gist`);
    formData.append("upload_preset", "ueut3dbz"); 
    formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
    formData.append("timestamp", (Date.now() / 1000) | 0);
    //const [birdRes, birdImageRes] = yield [call(api.POST, 'birds', action.bird.toJS()), call(api.POSTBIRD, formData)];
    //yield put(actions.createBirdUpload()); 
    yield put(load('Uploading Photo'));   
    const birdImageRes = yield call(api.POSTBIRD, formData);
  
    const birdInfo = {
      name: action.bird.get('name'),
      slug: slugs(action.bird.get('name')),
      order: action.bird.get('order'),  
      family: action.bird.get('family'),
      wingspan: fromJS([parseInt(action.bird.get('wingspan-min')), parseInt(action.bird.get('wingspan-max'))]),            
      species: action.bird.get('species'),
      location: action.bird.get('location') && action.bird.get('location').split(',').map( (item) => item.trim() ),      
      conservationStatus: action.bird.get('conservationStatus'),
      comments: action.bird.get('comments'),
      created_at: birdImageRes.created_at,
      bytes: birdImageRes.bytes,
      format: birdImageRes.format,
      imageAspect: calculateAspectRatios(birdImageRes.width, birdImageRes.height),
      imageUrl: birdImageRes.secure_url,
      public_id: birdImageRes.public_id,      
    };
    // console.log('uploading ', birdInfo); 
    const res = yield call(api.POST, 'birds', birdInfo);
    console.log(res);
    if(!res.error) {
      yield put(actions.createBirdSuccess(res.data));
    } else {
      throw res.error;
    }

    yield put(loaded());
    history.push(`/bird/${birdInfo.slug}`)
  } catch (error) {
    yield console.log(error);
  }
}

function* fetchBirdList(action) {
  try {
    yield put(load('fetching bird data'));  
    const birdList = yield call(api.GET, `birds`)
    yield put(actions.receiveBirdList(birdList));
    yield put(loaded());
  } catch(error) {
    console.log(error)
    // need to push somewhere
    history.push(`/bird`);
    
  }
}

function* deleteBird(action) {
      try {
        const id = action._id;
        yield put(load('Deleting Bird Profile'));  
        const removeBird = yield call(api.DELETE, `birds/${id}`);
        if(!removeBird.error) {
          console.log('deleted bird without error')
          const updates = {
            updates: {
              birdId: null,
              birdSlug: null
            }
          }
          // this updates the birdId entry in all of the photos because the bird has been deleted
          // it doesn't update state yet
          const updatePhotos = yield call(api.PUT, `birds/${id}/photos/birdId`, updates);
          yield put(actions.deleteBirdSuccess(action._id));
          yield put(loaded());           
          history.push('/bird');      
        }
      } catch(error) {
        console.log(error)
      }
}

function* updateBird(action) {
  try {
    console.log(action.birdId);
    
    // if no file attached we will update bird but leave photo unchanged
    const birdImage = action.bird.get('files') && action.bird.get('files')[0];
    let birdImageRes = null;
    yield put(load('Updating Bird Profile')); 
    if(birdImage) {
      console.log(' we have a file attached we will update bird photo')
      if(birdImage.type !== "image/jpeg") {
          swal('Incorrect file type')
          return;
      }    
      const formData = new FormData();
      formData.append("file", birdImage);
      //formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "ueut3dbz"); 
      formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
      formData.append("timestamp", (Date.now() / 1000) | 0);
        
      birdImageRes = yield call(api.POSTBIRD, formData);            
    }
    console.log(birdImageRes)
    // if birdImageRes we need to delete the current bird photo from cloudinary
    
    
    // console.log(birdImage)
    const birdInfo = {
      name: action.bird.get('name'),
      slug: slugs(action.bird.get('name')),
      order: action.bird.get('order'),
      family: action.bird.get('family'),
      wingspan: fromJS([parseInt(action.bird.get('wingspan-min')), parseInt(action.bird.get('wingspan-max'))]),               
      species: action.bird.get('species'),
      location: action.bird.get('location') && action.bird.get('location').split(',').map( (item) => item.trim() ),      
      conservationStatus: action.bird.get('conservationStatus'),
      comments: action.bird.get('comments')  
    }; 
    
    
    if(birdImageRes) {
      birdInfo.created_at = birdImageRes && birdImageRes.created_at;
      birdInfo.bytes = birdImageRes.bytes;
      birdInfo.format = birdImageRes.format;
      birdInfo.imageAspect = calculateAspectRatios(birdImageRes.width, birdImageRes.height),
      birdInfo.imageUrl = birdImageRes.secure_url;
      birdInfo.public_id = birdImageRes.public_id;   
    }
    
    const res = yield call(api.PUT, `birds/${action.birdId}`, birdInfo);
    console.log(res);
 //${res.data.slug}
    yield put(actions.updateBirdSuccess(res.data));
    yield put(loaded());
    history.push(`/bird/${res.data.slug}`);       
    
  } catch(error) {
    console.log(error)
  }
}

export function* watchFetchBirdList() {
  yield takeLatest(actions.REQUEST_BIRD_LIST, fetchBirdList);
}

export function* watchCreateBird() {
  yield takeLatest(actions.CREATE_BIRD, createBird);
}

// export function* watchFetchBird() {
//   yield takeLatest(actions.REQUEST_BIRD, fetchBird);
// }

export function* watchDeleteBird() {
  yield takeLatest(actions.DELETE_BIRD, deleteBird);
}

export function* watchUpdateBird() {
  yield takeLatest(actions.UPDATE_BIRD, updateBird);
}

export default function* rootSaga() {
  yield [
    // fork(watchFetchBird),
    fork(watchCreateBird),
    fork(watchFetchBirdList),
    fork(watchDeleteBird),
    fork(watchUpdateBird)
  ];
}