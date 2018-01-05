import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import header from './header';
import mainMenu from './mainMenu';
import home from './home';

const rootReducer = combineReducers({
  header,
  mainMenu,
  home,
  routing: routerReducer,
});

export default rootReducer;
