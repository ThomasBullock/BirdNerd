import { takeLatest } from 'redux-saga';
import slugs from 'slugs';
import { call, put, select, fork } from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../ducks/bird';
import history from '../history';

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
    console.log(action.bird.get('name'))
    console.log(action.bird.get('species'))
    console.log(action.bird.get('files'))    
    const birdImage = action.bird.get('files')[0];
    /// use jimp locally to resize file!???
    // const resizedPhoto = yield call(api.RESIZE, birdImage);
    const formData = new FormData();
    formData.append("file", birdImage);
    //formData.append("tags", `codeinfuse, medium, gist`);
    formData.append("upload_preset", "ueut3dbz"); 
    formData.append("api_key", process.env.CLOUDINARY_API_KEY); 
    formData.append("timestamp", (Date.now() / 1000) | 0);
    //const [birdRes, birdImageRes] = yield [call(api.POST, 'birds', action.bird.toJS()), call(api.POSTBIRD, formData)];
    yield put(actions.createBirdUpload());    
    const birdImageRes = yield call(api.POSTBIRD, formData);
  
    const birdInfo = {
      name: action.bird.get('name'),
      slug: slugs(action.bird.get('name')),
      order: action.bird.get('order'),      
      species: action.bird.get('species'),
      location: action.bird.get('location').split(',').map( (item) => item.trim() ),      
      conservationStatus: action.bird.get('conservationStatus'),
      comments: action.bird.get('comments'),
      created_at: birdImageRes.created_at,
      bytes: birdImageRes.bytes,
      format: birdImageRes.format,
      imageUrl: birdImageRes.secure_url
    }; 
    yield call(api.POST, 'birds', birdInfo);
    yield put(actions.createBirdSuccess(birdInfo));
    history.push(`/bird/${birdInfo.slug}`)
  } catch (error) {
    yield console.log(error);
  }
}

function* fetchBirdList(action) {
  try {
    const birdList = yield call(api.GET, `birds`)
    // console.log("BirdList in saga : ",birdList)
    yield put(actions.receiveBirdList(birdList));
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

export function* watchFetchBird() {
  yield takeLatest(actions.REQUEST_BIRD, fetchBird);
}

export default function* rootSaga() {
  yield [
    fork(watchFetchBird),
    fork(watchCreateBird),
    fork(watchFetchBirdList),
  ];
}