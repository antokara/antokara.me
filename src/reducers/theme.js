import {
  GET_THEME,
} from 'Constants/actionTypes';
import { handleAction } from 'redux-actions';

const defaultState = {
};

const reducer = handleAction(GET_THEME, (state, action) => ({
  ...state,
  header: {
    ...action.payload.items[0].fields.header.fields,
    icons: action.payload.items[0].fields.header.fields.icons.map(value => ({
      alt: value.fields.alt,
      internal: value.fields.internal,
      url: value.fields.url,
      assetUrl: value.fields.icon.fields.file.url,
    })),
  },
  mainMenu: {
    ...action.payload.items[0].fields.mainMenu.fields,
    icons: action.payload.items[0].fields.mainMenu.fields.icons.map(value => ({
      alt: value.fields.alt,
      internal: value.fields.internal,
      url: value.fields.url,
      assetUrl: value.fields.icon.fields.file.url,
    })),
  },
}), defaultState);

export { reducer, defaultState };
