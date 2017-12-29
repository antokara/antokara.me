import {
  GET_HEADER,
} from 'Constants/actionTypes';
import { createAction } from 'redux-actions';
import ContentfulClient from 'Helpers/ContentfulClient';

const cc = new ContentfulClient();
const getHeader = createAction(GET_HEADER, async () => cc.getEntry(cc.entries.header));

export default getHeader;
