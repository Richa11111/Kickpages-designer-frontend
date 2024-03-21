export enum ActionTypes {
    CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST',
    CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS',
    CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE',
    CATEGORY_CREATE_REQUEST = 'CATEGORY_CREATE_REQUEST',
    CATEGORY_CREATE_SUCCESS = 'CATEGORY_CREATE_SUCCESS',
    CATEGORY_CREATE_FAILURE = 'CATEGORY_CREATECREATE_FAILURE',
    CATEGORY_UPDATE_REQUEST = 'CATEGORY_UPDATE_REQUEST',
    CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS',
    CATEGORY_UPDATE_FAILURE = 'CATEGORY_UPDATE_FAILURE',
    CATEGORY_DELETE_REQUEST = 'CATEGORY_DELETE_REQUEST',
    CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS',
    CATEGORY_DELETE_FAILURE = 'CATEGORY_DELETE_FAILURE',
    CATEGORY_STATUS_REQUEST = 'CATEGORY_STATUS_REQUEST',
    CATEGORY_STATUS_SUCCESS = 'CATEGORY_STATUS_SUCCESS',
    CATEGORY_STATUS_FAILURE = 'CATEGORY_STATUS_FAILURE',
    CATEGORY_CREATE_CLEAR = 'CATEGORY_CREATE_CLEAR',
    CATEGORY_CREATE_VALIDATION_FAILURE = "CATEGORY_CREATE_VALIDATION_FAILURE"
}


// ---------------
// Action Creators
// ---------------


export const categoryRequestAction = (payload: any) => ({
    type: ActionTypes.CATEGORY_LIST_REQUEST,
    payload,
});

export const categoryCreateRequestAction = (payload: any) => ({
    type: ActionTypes.CATEGORY_CREATE_REQUEST,
    payload,
});

export const categoryCreateSuccess = (token: string): any => ({
    type: ActionTypes.CATEGORY_CREATE_SUCCESS,
    token,
});

export const categoryCreateFailure = (error: string): any => ({
    type: ActionTypes.CATEGORY_CREATE_FAILURE,
    error,
});

export const categoryUpdateRequestAction = (payload: any) => ({
    type: ActionTypes.CATEGORY_UPDATE_REQUEST,
    payload,
});
export const categoryDeleteRequestAction = (payload: any) => ({
    type: ActionTypes.CATEGORY_DELETE_REQUEST,
    payload,
});
export const categoryStatusRequestAction = (payload: any) => ({
    type: ActionTypes.CATEGORY_STATUS_REQUEST,
    payload,
});
