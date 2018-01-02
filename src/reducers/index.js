import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header';
import mainMenu from './mainMenu';

const rootReducer = combineReducers({
  header,
  mainMenu,
  routing: routerReducer,
});

export default rootReducer;
