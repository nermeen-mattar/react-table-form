import { delay, put, takeLatest } from 'redux-saga/effects';
import { createObjectAysnc } from '../actions';

// responsible of the side effects and since it is a redux middleware it can handle/dispatch redux functions

function* createObjectAsync() { // worker
    yield delay(1000); // to be replaced with backend call
    // const json = yield fetch('https://newsapi.org/v1/articles? 
    // source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    // .then(response => response.json(), );    
    yield put(createObjectAysnc(1));
}

export function* watchCreateObject() { // watcher
    yield takeLatest('CREATE_OBJECT', createObjectAsync); // used to pause the function
}