import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as theme from './theme';
import home from './home';
import demos from './demos';
import skills from './skills';
import contact from './contact';

const rootReducer = combineReducers({
  theme: theme.reducer,
  routing: routerReducer,
  home,
  demos,
  skills,
  contact,
});

export default rootReducer;
