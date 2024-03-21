import { put, takeLatest, all, fork, call } from "redux-saga/effects";
import NProgress from "nprogress";
import axios from 'axios';
import { postWithoutHeaderRequestAPI, postWithTokenRequestAPI } from '../http';
import {
  ActionTypes,
} from "./categoryAction";

function* fetchAllCategoryRequestSaga(action: any): Generator<any, void, any> {
  try {
    console.log('fetchAllCategoryRequestSaga', fetchAllCategoryRequestSaga)
    let payload = {};
    if (action.payload.payload) {
      const { page, limit, order, direction, keyword: search } = action.payload.payload;
      payload = { page, limit, order, direction, search };
    }
    const token = localStorage.getItem("token");

    const response = yield call<any>(postWithTokenRequestAPI, { url: '/category/getAll', data: payload , token });
    if (response.status === "success") {
      yield put({
        type: ActionTypes.CATEGORY_LIST_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: ActionTypes.CATEGORY_LIST_FAILURE,
        error: response.message,
      });
    }
  } catch (err: any) {
    console.log('err')
    yield put({ type: ActionTypes.CATEGORY_LIST_FAILURE, error: err.message });
  }
}

function* createCategorySaga(action: any): Generator<any, void, any> {
  NProgress.start();
  try {
      const token = localStorage.getItem("token");
    const response = yield call<any>(postWithTokenRequestAPI, { url: '/category/create', data: action.payload , token });

    if (response.status === "success") {
      yield put({
        type: ActionTypes.CATEGORY_CREATE_SUCCESS,
        payload: response.message,
      });
    } else {
      yield put({
        type: ActionTypes.CATEGORY_CREATE_FAILURE,
        error: response.message,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.CATEGORY_CREATE_FAILURE,
      error: err.message,
    });
  } finally {
    NProgress.done();
  }
}

function* updateCategorySaga(action: any): Generator<any, void, any> {
  NProgress.start();
  try {
        const token = localStorage.getItem("token");
        const response = yield call<any>(postWithTokenRequestAPI, { url: '/category/update', data: action.payload , token });

    if (response.status === "success") {
      yield put({
        type: ActionTypes.CATEGORY_UPDATE_SUCCESS,
        payload: response.message,
      });
    } else {
      yield put({
        type: ActionTypes.CATEGORY_UPDATE_FAILURE,
        payload: response.message,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.CATEGORY_UPDATE_FAILURE,
      error: err.message,
    });
  } finally {
    NProgress.done();
  }
}

function* deleteCategorySaga(action: any): Generator<any, void, any> {
  NProgress.start();
  try {
      const token = localStorage.getItem("token");
      const response = yield call<any>(postWithTokenRequestAPI, { url: '/category/delete', data: action.payload , token });
    if (response.status === "success") {
      yield put({
        type: ActionTypes.CATEGORY_DELETE_SUCCESS,
        payload: response.message,
      });
    } else {
      yield put({
        type: ActionTypes.CATEGORY_DELETE_FAILURE,
        payload: response.message,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.CATEGORY_DELETE_FAILURE,
      error: err.message,
    });
  } finally {
    NProgress.done();
  }
}

function* statusUpdateCategorySaga(action: any): Generator<any, void, any> {
  NProgress.start();
  try {
    const token = localStorage.getItem("token");
    const response = yield call<any>(postWithTokenRequestAPI, { url: '/category/updateStatus', data: action.payload , token });
    if (response.status === "success") {
      yield put({
        type: ActionTypes.CATEGORY_STATUS_SUCCESS,
        payload: response.message,
      });
    } else {
      yield put({
        type: ActionTypes.CATEGORY_STATUS_FAILURE,
        error: response.message,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.CATEGORY_STATUS_FAILURE,
      error: err.message,
    });
  } finally {
    NProgress.done();
  }
}

function* watchCategoryRequest() {
  yield takeLatest(ActionTypes.CATEGORY_LIST_REQUEST   as any, fetchAllCategoryRequestSaga);
  yield takeLatest(ActionTypes.CATEGORY_CREATE_REQUEST as any, createCategorySaga);
  yield takeLatest(ActionTypes.CATEGORY_UPDATE_REQUEST as any, updateCategorySaga);
  yield takeLatest(ActionTypes.CATEGORY_DELETE_REQUEST as any, deleteCategorySaga);
  yield takeLatest(ActionTypes.CATEGORY_STATUS_REQUEST as any, statusUpdateCategorySaga);
}

function* categorySaga() {
  yield all([
    fork(watchCategoryRequest),
  ]);
}

export default categorySaga;
