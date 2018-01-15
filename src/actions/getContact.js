import {
  GET_CONTACT,
} from 'Constants/actionTypes';
import { createAction } from 'redux-actions';
import ContentfulClient from 'Helpers/ContentfulClient';

const cc = new ContentfulClient();
const getContact = createAction(GET_CONTACT, async () => cc.getEntries({
  'sys.id': cc.entries.contact,
}));

export default getContact;
