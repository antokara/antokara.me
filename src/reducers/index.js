import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as theme from './theme';
import home from './home';

const rootReducer = combineReducers({
  theme: theme.reducer,
  routing: routerReducer,
  home,
});

export default rootReducer;
