import { takeLatest } from 'redux-saga';
import slugs from 'slugs';
import { call, put, select, fork } from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../ducks/bird';

function* createBird(action) {
  try {  
    const birdImage = action.bird.get('files')[0];
    const formData = new FormData();
    formData.append("file", birdImage);
    //formData.append("tags", `codeinfuse, medium, gist`);
    formData.append("upload_preset", "yywnnb3e"); 
    formData.append("api_key", "367398423823381"); 
    formData.append("timestamp", (Date.now() / 1000) | 0);
    //const [birdRes, birdImageRes] = yield [call(api.POST, 'birds', action.bird.toJS()), call(api.POSTBIRD, formData)];
    const birdImageRes = yield call(api.POSTBIRD, formData);
  
    const birdInfo = {
      name: action.bird.get('name'),
      slug: slugs(action.bird.get('name')),
      species: action.bird.get('species'),
      location: action.bird.get('location').split(',').map( (item) => item.trim() ),      
      conservationStatus: action.bird.get('conservationStatus'),
      created_at: birdImageRes.created_at,
      bytes: birdImageRes.bytes,
      format: birdImageRes.format,
      imageUrl: birdImageRes.secure_url
    };
    // console.log(birdInfo);
    yield call(api.POST, 'birds', birdInfo);
    yield put(actions.createBirdSuccess(birdInfo));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchCreateBird() {
  yield takeLatest(actions.CREATE_BIRD, createBird);
}

export default function* rootSaga() {
  yield [fork(watchCreateBird)];
}