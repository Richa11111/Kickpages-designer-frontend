import { put, takeLatest, fork, call, all } from 'redux-saga/effects';
import axios from 'axios';
// import { post } from '../../http';
import { postWithoutHeaderRequestAPI, postWithTokenRequestAPI } from '../http';
import {
    ActionTypes,
} from "./templateAction";

function* fetchAllCategoryRequestSaga(): Generator<any, void, any> {
    try {
        const token = localStorage.getItem("token");
        const response = yield call<any>(postWithTokenRequestAPI, { url: '/category/getAllCategories', data: {} , token });

        if (response.status === 'success') {
            yield put({
                type: ActionTypes.TEMPLATE_CATEGORY_LIST_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: ActionTypes.TEMPLATE_CATEGORY_LIST_FAILURE,
                error: response.message,
            });
        }
    } catch (err: any) {
        yield put({
            type: ActionTypes.TEMPLATE_CATEGORY_LIST_FAILURE,
            error: err.message,
        });
    }
}

function* createTemplateRequestSaga(action: any): Generator<any, void, any> {
    try {
        const token = localStorage.getItem("token");
        const response = yield call<any>(postWithTokenRequestAPI, { url: '/template/create', data: action.payload, token });

        if (response.status === 'success') {
            yield put({
                type: ActionTypes.CREATE_TEMPLATE_SUCCESS,
                payload: response.payload,
            });
        } else {
            yield put({
                type: ActionTypes.CREATE_TEMPLATE_FAILURE,
                error: response.message,
            });
        }
    } catch (err: any) {
        console.log('err',err)
        yield put({
            type: ActionTypes.CREATE_TEMPLATE_FAILURE,
            error: err.message,
        });
    }
}

function* getAllTemplateRequestSaga(action: any): Generator<any, void, any> {
    try {
        let payload = {};
        if (action.payload) {
            const { page, limit, searchQuery } = action.payload;
            payload = { page, limit, filterId: searchQuery };
        }

        const token = localStorage.getItem("token");
        const response = yield call<any>(postWithTokenRequestAPI, { url: '/template/getAll', data: action.payload , token });

        if (response.status === 'success') {
            yield put({
                type: ActionTypes.TEMPLATE_FETCH_SUCCESS,
                payload: response,
            });
        } else {
            yield put({
                type: ActionTypes.TEMPLATE_FETCH_FAILURE,
                error: response.msg,
            });
        }
    } catch (err: any) {
        yield put({ type: ActionTypes.TEMPLATE_FETCH_FAILURE, error: err.message });
    }
}

function* updateTemplateSaga(action: any): Generator<any, void, any> {
    try {
        const token = localStorage.getItem("token");
        const response = yield call<any>(postWithTokenRequestAPI, { url: `/template/update/${action.payload.id}`, data:  action.payload.formData , token });

        if (response.status === 'success') {
            yield put({
                type: ActionTypes.EDIT_TEMPLATE_SUCCESS,
                payload: response.message,
            });
        } else {
            yield put({
                type: ActionTypes.EDIT_TEMPLATE_FAILURE,
                error: response.message,
            });
        }
    } catch (err: any) {
        yield put({ type: ActionTypes.EDIT_TEMPLATE_FAILURE, error: err.message });
    }
}

function* deleteTemplateSaga(action: any): Generator<any, void, any> {
    try {
        const token = localStorage.getItem("token");
        const response = yield call<any>(postWithTokenRequestAPI, { url: `/template/delete/${action.payload}`, data: {} , token });

        if (response.status === 'success') {
            yield put({
                type: ActionTypes.DELETE_TEMPLATE_SUCCESS,
                payload: response.message,
            });
        } else {
            yield put({
                type: ActionTypes.DELETE_TEMPLATE_FAILURE,
                error: response.message,
            });
        }
    } catch (err: any) {
        yield put({
            type: ActionTypes.DELETE_TEMPLATE_FAILURE,
            error: err.message,
        });
    }
}

function* watchTemplateRequest() {
    yield takeLatest(ActionTypes.TEMPLATE_CATEGORY_LIST_REQUEST as any, fetchAllCategoryRequestSaga);
    yield takeLatest(ActionTypes.CREATE_TEMPLATE_REQUEST as any, createTemplateRequestSaga);
    yield takeLatest(ActionTypes.TEMPLATE_FETCH_REQUEST as any, getAllTemplateRequestSaga);
    yield takeLatest(ActionTypes.EDIT_TEMPLATE_REQUEST as any, updateTemplateSaga);
    yield takeLatest(ActionTypes.DELETE_TEMPLATE_REQUEST as any, deleteTemplateSaga);
}

// export all sagas methods
function* templateSaga() {
    yield all([
        fork(watchTemplateRequest),
    ]);
}

export default templateSaga;
