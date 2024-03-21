export enum ActionTypes {
    TEMPLATE_CATEGORY_LIST_REQUEST = 'TEMPLATE_CATEGORY_LIST_REQUEST',
    TEMPLATE_CATEGORY_LIST_SUCCESS = 'TEMPLATE_CATEGORY_LIST_SUCCESS',
    TEMPLATE_CATEGORY_LIST_FAILURE = 'TEMPLATE_CATEGORY_LIST_FAILURE',
    CREATE_TEMPLATE_REQUEST = 'CREATE_TEMPLATE_REQUEST',
    CREATE_TEMPLATE_SUCCESS = 'CREATE_TEMPLATE_SUCCESS',
    CREATE_TEMPLATE_FAILURE = 'CREATE_TEMPLATE_FAILURE',
    TEMPLATE_FETCH_REQUEST = 'TEMPLATE_FETCH_REQUEST',
    TEMPLATE_FETCH_SUCCESS = 'TEMPLATE_FETCH_SUCCESS',
    TEMPLATE_FETCH_FAILURE = 'TEMPLATE_FETCH_FAILURE',
    EDIT_TEMPLATE_REQUEST = 'EDIT_TEMPLATE_REQUEST',
    EDIT_TEMPLATE_SUCCESS = 'EDIT_TEMPLATE_SUCCESS',
    EDIT_TEMPLATE_FAILURE = 'EDIT_TEMPLATE_FAILURE',
    DELETE_TEMPLATE_REQUEST = 'DELETE_TEMPLATE_REQUEST',
    DELETE_TEMPLATE_SUCCESS = 'DELETE_TEMPLATE_SUCCESS',
    DELETE_TEMPLATE_FAILURE = 'DELETE_TEMPLATE_FAILURE'
    

}


export interface TemplateCreateRequestPayload {
    name: string;
    description: string;
    category: string;
}

export interface TemplateFetchRequestPayload {
    page: number;
    limit: number;
    searchQuery?: string;
}

export interface TemplateEditRequestPayload {
    formData: any; 
    id: string;
    type: any;
}

export interface TemplateDeleteRequestPayload {
    id: string;
}


// ---------------
// Action Creators
// ---------------


export const templateCategoriesRequestAction = () => ({
    type: ActionTypes.TEMPLATE_CATEGORY_LIST_REQUEST,
    
});
export const templateCreateRequestAction = (payload: TemplateCreateRequestPayload) => ({
    type: ActionTypes.CREATE_TEMPLATE_REQUEST,
    payload,
});
export const templatEFetchRequestAction = (payload: TemplateFetchRequestPayload) => ({
    type: ActionTypes.TEMPLATE_FETCH_REQUEST,
    payload,
});
export const templateEditRequestAction = (formData: any, id: string ):any => ({
    type: ActionTypes.EDIT_TEMPLATE_REQUEST,
    payload: { formData, id },
});
export const templateDeleteRequestAction = (payload: TemplateDeleteRequestPayload) => ({
    type: ActionTypes.DELETE_TEMPLATE_REQUEST,
    payload,
});
