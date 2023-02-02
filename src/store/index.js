import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './modules/users';

const rootReducer = combineReducers({
  user: userReducer,
});

const rootStore = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

export default rootStore;
