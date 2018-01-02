import {
  GET_MAIN_MENU,
} from 'Constants/actionTypes';
import { createAction } from 'redux-actions';
import ContentfulClient from 'Helpers/ContentfulClient';

const cc = new ContentfulClient();
const getMainMenu = createAction(GET_MAIN_MENU, async () => cc.getEntries({
  'sys.id': cc.entries.mainMenu,
}));

export default getMainMenu;
