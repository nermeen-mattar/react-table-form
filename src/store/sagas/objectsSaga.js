import { delay, put, takeLatest } from 'redux-saga/effects';

function* getAllObjects() { // worker
    yield delay(1000); // to be replaced with backend call  
    yield put({type: 'CREATE_OBJECT_ASYNC', value: {name: 'test'}});
}

export function* watchGetObjects() { // watcher
    yield takeLatest('CREATE_OBJECT', getAllObjects);
}