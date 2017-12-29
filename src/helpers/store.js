import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'ReduxLogger';
import { composeWithDevTools } from 'ReduxDevtoolsExtension';
import promiseMiddleware from 'redux-promise';
import rootReducer from 'Reducers/index';
import browserHistory from './browserHistory';

// @see https://github.com/acdlite/redux-promise
const middleware = [promiseMiddleware];

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
