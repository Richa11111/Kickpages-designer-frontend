import { combineReducers } from '@reduxjs/toolkit';
import signInReducer from './signin/signInReducer';
import categoryReducer from './category/categoryReducer';
import templateReducer from './template/templateReducer';

export const appReducer = combineReducers({
  signIn: signInReducer,
  category: categoryReducer,
  template: templateReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>