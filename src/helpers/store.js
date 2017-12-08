import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import browserHistory from './browserHistory';
import rootReducer from '../reducers/index';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// intercepts and dispatches navigation actions
middleware.push(routerMiddleware(browserHistory));

// apply middlewares and get store enhancer
let storeEnhancer = applyMiddleware(...middleware);

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = composeWithDevTools({
  });
  storeEnhancer = composeEnhancers(storeEnhancer);
}

// finally, create the store
const store = createStore(
  rootReducer,
  storeEnhancer,
);

export default store;
