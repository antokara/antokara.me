import {
  GET_HEADER,
} from 'Constants/actionTypes';
import { handleAction } from 'redux-actions';

const defaultState = {
};

const header = handleAction(GET_HEADER, (state, action) => ({
  ...state,
  ...action.payload.fields,
}), defaultState);

export default header;
