import {
  GET_HOME,
} from 'Constants/actionTypes';
import { handleAction } from 'redux-actions';

const defaultState = {
};

const home = handleAction(GET_HOME, (state, action) => ({
  ...state,
  ...action.payload.items[0].fields,
}), defaultState);

export default home;
