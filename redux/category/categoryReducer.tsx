import { Reducer } from 'redux';
import { ActionTypes as Type } from './categoryAction';

export interface AuthenticationReducerType {
isFetching: any,
  errorMessage: any,
  data: [],
  success: any,
  isUpdated: any,
  category_loadng:any,
  category_success: any,
  category_error: any,
  isStatusUpdated:any,
  isdeleted: any,
  totalPages: any,
  update_course_error:any,
  category_validation_error:any
}

const defaultState: AuthenticationReducerType = {
    isFetching: false,
    errorMessage: null,
    data: [],
    category_loadng:false,
    category_success: false,
    category_error: false,
    category_validation_error: false,
    isUpdated: false,
    isStatusUpdated: false,
    isdeleted: false,
    totalPages: 0,
    update_course_error: null,
    success: false
};

const reducer:any = (state = defaultState, action:any) => {
    switch (action.type) {
        case Type.CATEGORY_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: "",
                isUpdated:false,
                isdeleted:false,
                isStatusUpdated:false,
                category_validation_error:false,
                category_success: false,
                category_error: false,

            };
       case Type.CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isFetching: false,
                errorMessage: "",
            };
        case Type.CATEGORY_LIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            };

        case Type.CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                category_loadng: true,
                category_error:false,
                category_success:false,
                category_validation_error:false,

            };
        case Type.CATEGORY_CREATE_SUCCESS:
            return {
                ...state,
                category_loadng: false,
                category_success: true,

            };

        case Type.CATEGORY_CREATE_FAILURE:
            return {
                ...state,
                category_loadng: false,
                category_error: action.error,
            };
        case Type.CATEGORY_CREATE_VALIDATION_FAILURE:
            return {
                ...state,
                category_loadng: false,
                category_validation_error: action.payload,
            };
        case Type.CATEGORY_UPDATE_REQUEST:
            return {
                ...state,
                category_loadng: true,
                isupdated: false,
                category_error:false,

            };
        case Type.CATEGORY_UPDATE_SUCCESS:
            return {
                ...state,
                category_loadng: false,
                isUpdated: true,

            };

        case Type.CATEGORY_UPDATE_FAILURE:
            return {
                ...state,
                category_loadng: false,
                category_error: action.payload,
            };
      
        case Type.CATEGORY_DELETE_REQUEST:
            return {
                ...state,
                category_loadng: true,
                category_error:false,

            };
        case Type.CATEGORY_DELETE_SUCCESS:
            return {
                ...state,
                category_loadng: false,
                isdeleted: true,

            };

        case Type.CATEGORY_DELETE_FAILURE:
            return {
                ...state,
                category_loadng: false,
                category_error: action.payload,
            };
      
        case Type.CATEGORY_CREATE_CLEAR:
            return {
                ...state,
                category_loadng: false,
                category_error: false,
            };
        case Type.CATEGORY_STATUS_REQUEST:
            return {
                ...state,
                category_loadng: true,
                isStatusUpdated: false,
                category_error:false,

            };
        case Type.CATEGORY_STATUS_SUCCESS:
            return {
                ...state,
                category_loadng: false,
                isStatusUpdated: true,

            };

        case Type.CATEGORY_STATUS_FAILURE:
            return {
                ...state,
                category_loadng: false,
                category_error: action.error,
            };
        case Type.CATEGORY_STATUS_FAILURE:
            return {
                ...state,
                category_loadng: false,
                category_error: action.payload,
            };
        
        default:
            return state;
    }
};
export default reducer;
