import { GET_DEMOS } from 'Constants/actionTypes';
import { createAction } from 'redux-actions';
import ContentfulClient from 'Helpers/ContentfulClient';

const cc = new ContentfulClient();
const getDemos = createAction(GET_DEMOS, async () => cc.getEntries({
  'sys.id': cc.entries.demos,
  include: 5,
}));

export default getDemos;
