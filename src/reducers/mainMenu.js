import {
  GET_MAIN_MENU,
} from 'Constants/actionTypes';
import { handleAction } from 'redux-actions';

const defaultState = {
};

const mainMenu = handleAction(GET_MAIN_MENU, (state, action) => ({
  ...state,
  ...action.payload.items[0].fields,
  icons: action.payload.items[0].fields.icons.map(value => ({
    alt: value.fields.alt,
    internal: value.fields.internal,
    url: value.fields.url,
    assetUrl: value.fields.icon.fields.file.url,
  })),
}), defaultState);

export default mainMenu;
