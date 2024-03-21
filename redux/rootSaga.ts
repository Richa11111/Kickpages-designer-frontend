import { all, fork } from 'redux-saga/effects';
import signInSaga from './signin/signInSagas'; 
import categorySaga from './category/categorySagas';
import templateSaga from './template/templateSagas';

export function* rootSaga() {
  yield all([
    fork(signInSaga),
    fork(categorySaga),
    fork(templateSaga)
  ]);
}
