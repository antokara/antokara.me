import {
  GET_HEADER,
  GET_HEADER_SUCCESS,
  GET_HEADER_FAILURE,
} from 'Constants/actionTypes';
import contentfulEntries from 'Constants/contentfulEntries';

// actions creators
const getHeaderAC = () => (
  {
    type: GET_HEADER,
  }
);
const getHeaderSuccessAC = json => (
  {
    type: GET_HEADER_SUCCESS,
    header: json,
  }
);
const getHeaderFailureAC = error => (
  {
    type: GET_HEADER_FAILURE,
    error,
  }
);

const getHeader = contentfulClient => (
  (dispatch) => {
    dispatch(getHeaderAC());
    return contentfulClient.getEntry(contentfulEntries.header)
      .then((json) => {
        dispatch(getHeaderSuccessAC(json));
      })
      .catch((error) => {
        dispatch(getHeaderFailureAC(error));
      });
  }
);

export default getHeader;
