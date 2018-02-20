import { GET_THEME } from 'Constants/actionTypes';
import { createAction } from 'redux-actions';
import ContentfulClient from 'Helpers/ContentfulClient';

const cc = new ContentfulClient();
const getTheme = createAction(GET_THEME, async () => cc.getEntries({
  'sys.id': cc.entries.theme,
  include: 2,
}));

export default getTheme;
