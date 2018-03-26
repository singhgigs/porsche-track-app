import { combineReducers } from 'redux';
//import location from './location_reducer';
import login from './login_reducer';

const rootReducer =  combineReducers({
  loginReducer: login
});

export default rootReducer;
