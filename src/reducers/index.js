import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header';

const rootReducer = combineReducers({
  header,
  routing: routerReducer,
});

export default rootReducer;
