import {
  GET_HOME,
} from 'Constants/actionTypes';
import { createAction } from 'redux-actions';
import ContentfulClient from 'Helpers/ContentfulClient';

const cc = new ContentfulClient();
const getHome = createAction(GET_HOME, async () => cc.getEntries({
  'sys.id': cc.entries.home,
}));

export default getHome;
