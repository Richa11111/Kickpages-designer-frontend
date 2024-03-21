import { Reducer } from 'redux';
import { ActionTypes as Type } from './signInActions';

export interface AuthenticationReducerType {
    isLoggingIn: boolean;
    error?: string;
    resData: any;
}

const defaultState: AuthenticationReducerType = {
    isLoggingIn: false,
    resData: undefined,
};

const reducer: Reducer<AuthenticationReducerType> = (state = defaultState, action: any) => {
    switch (action.type) {
        case Type.LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
            };
        case Type.LOGIN_SUCCESS:
            return {
                ...state,
                resData: action.resData,
                isLoggingIn: false,
            };
        case Type.LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                resData: action.error,
            };
        case Type.LOGIN_CLEAR:
            return {
                ...state,
                isLoggingIn: false,
                resData: undefined

            };
        case Type.LOGOUT:
            return defaultState;
        default:
            return state;
    }
};
export default reducer;
