import {
  GET_HEADER,
  GET_HEADER_SUCCESS,
  GET_HEADER_FAILURE,
} from 'Constants/actionTypes';

export const getHeader = cc => (
  {
    type: GET_HEADER,
    request: cc.getEntry(cc.entries.header),
  }
);
export const getHeaderSuccess = fields => (
  {
    type: GET_HEADER_SUCCESS,
    fields,
  }
);
export const getHeaderFailure = error => (
  {
    type: GET_HEADER_FAILURE,
    error,
  }
);
