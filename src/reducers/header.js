import {
  GET_HEADER_SUCCESS,
  GET_HEADER_FAILURE,
} from 'Constants/actionTypes';

const initialState = {
  header: null,
};

const header = (state = initialState, action) => {
  switch (action.type) {
    case GET_HEADER_SUCCESS:
      return {
        ...state,
        ...action.header,
      };
    case GET_HEADER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default header;
