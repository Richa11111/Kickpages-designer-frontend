// --------------------------------------------------------
// Created by : Richa
// Created date : 19-Mar-2024
// File description : File can use for action redux
// --------------------------------------------------------


export enum ActionTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGIN_CLEAR = 'LOGIN_CLEAR',
    LOGOUT = 'LOGOUT',
}
export interface LoginRequest {
    type: ActionTypes.LOGIN_REQUEST;
    email_id: string;
    password: string;
}

export interface Action<T> {
    type: ActionTypes;
    payload: T;
}

// ---------------
// Action Creators
// ---------------

export interface LoginData {
    email_id: string | null;
    password: string | null;
}


export const loginUserAction = (payload: LoginData) => ({
    type: ActionTypes.LOGIN_REQUEST,
    payload,
});
export const LogoutUserAction = () => ({
    type: ActionTypes.LOGIN_CLEAR
});
