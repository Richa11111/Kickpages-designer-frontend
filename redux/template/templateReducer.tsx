import { Reducer } from 'redux';
import { ActionTypes as Type } from './templateAction';
interface PaginationType {
    totalItems: any;
    totalPages: any;
    currentPage: any;
}
export interface AuthenticationReducerType {
    isFetching: any,
    errorMessage: any,
    category: [],
    isTemplateCreated:any,
    category_loadng:any,
    template_loading:any,
    template:any,
    pagination: PaginationType,
     isDeleted:any,
    isEdited:any,
    
}

const defaultState: AuthenticationReducerType = {
    isFetching: false,
    errorMessage: null,
    category: [],
    isTemplateCreated:false,
    category_loadng:false,
    template_loading: false,
    isDeleted:false,
    isEdited:false,
    template: undefined,
    pagination: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  },
};

const reducer: Reducer<any> = (state = defaultState, action:any) => {
    switch (action.type) {
  
        case Type.TEMPLATE_CATEGORY_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: "",
                category: [],
                template:undefined,
                isTemplateCreated:false,
                isDeleted:false,
                isEdited:false,
            };
        case Type.TEMPLATE_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                category: action.payload,
                isFetching: false,
                isDeleted:false,
                isEdited:false,
                errorMessage: "",
            };
        case Type.TEMPLATE_CATEGORY_LIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            };
          case Type.CREATE_TEMPLATE_REQUEST:
            return {
                ...state,
                errorMessage:false,
                isTemplateCreated:false
               

            };
        case Type.CREATE_TEMPLATE_SUCCESS:
            return {
                ...state,
                isTemplateCreated:true,
                errorMessage:false

            };

        case Type.CREATE_TEMPLATE_FAILURE:
            return {
                ...state,
                category_loadng: false,
                errorMessage: action.error,
            };
         case Type.TEMPLATE_FETCH_REQUEST:
            return {
                ...state,
                template_loading: true,
                isDeleted: false,
                isEdited: false,
                isTemplateCreated: false
            };
        case Type.TEMPLATE_FETCH_SUCCESS:
            return {
                ...state,
                template_loading: false,
                template: action.payload,
                 pagination: { 
                 totalItems: action.payload.pagination.total,
                 totalPages: action.payload.pagination.pages,
                 currentPage: action.payload.pagination.page,
                },
                };
        case Type.TEMPLATE_FETCH_FAILURE:
            return {
                ...state,
                template_loading: false,
                errorMessage: action.payload,
            };

             case Type.EDIT_TEMPLATE_REQUEST:
            return {
                ...state,
                errorMessage:false,
                isEdited:false,
            };
        case Type.EDIT_TEMPLATE_SUCCESS:
            return {
                ...state,
                isEdited:true,

            };

        case Type.EDIT_TEMPLATE_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
            };
         case Type.DELETE_TEMPLATE_REQUEST:
            return {
                ...state,
                errorMessage:false,
                isDeleted:false
            };
        case Type.DELETE_TEMPLATE_SUCCESS:
            return {
                ...state,
                isDeleted:true,
                errorMessage:false

            };

        case Type.DELETE_TEMPLATE_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};
export default reducer;
