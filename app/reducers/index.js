import {combineReducers} from 'redux';
// import app from './app';
import auth from './auth';
import cartReducer from './cartReducer';

export default combineReducers({
  // app,
  auth,
  cartReducer,
});
