// --------------------------------------------------------
// Created by : Richa
// Created date : 19-Mar-2021
// File description : File can use for redux sagas
// --------------------------------------------------------

import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { postWithoutHeaderRequestAPI } from '../http';
import { ActionTypes } from './signInActions';
import NProgress from 'nprogress';
import Cookie from 'js-cookie';

function* loginRequestSaga({ payload }: any): Generator<any, void, any> {
    NProgress.start();
    try {
       
        const response = yield call<any>(postWithoutHeaderRequestAPI, { url: '/do-login', data: payload });
        localStorage.setItem('token',response.data.jwtToken )
        Cookie.set('token', response.data.jwtToken, { expires: 7 }); // Expires in 7 days
        if (response.status === 'success') {
            yield put({ type: ActionTypes.LOGIN_SUCCESS, resData: response });
        } else {
            yield put({ type: ActionTypes.LOGIN_FAILURE, error: response });
        }
    } catch (err: any) {
        yield put({ type: ActionTypes.LOGIN_FAILURE, error: { status: 'failed', message: err } });
    } finally {
        setTimeout(() => NProgress.done(), 500);
    }
}

function* watchLoginRequest() {
    yield takeLatest(ActionTypes.LOGIN_REQUEST as any, loginRequestSaga);
}

function* signInSaga() {
    yield all([
        fork(watchLoginRequest),
    ]);
}

export default signInSaga;
