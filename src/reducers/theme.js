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
    circle: action.payload.items[0].fields.mainMenu.fields.circle.fields.file.url,
  },
  footer: {
    ...action.payload.items[0].fields.footer.fields,
    icons: action.payload.items[0].fields.footer.fields.icons.map(value => ({
      alt: value.fields.alt,
      internal: value.fields.internal,
      url: value.fields.url,
      assetUrl: value.fields.icon.fields.file.url,
    })),
    locationIcon: {
      alt: action.payload.items[0].fields.footer
        .fields.locationIcon.fields.alt,
      internal: action.payload.items[0].fields.footer
        .fields.locationIcon.fields.internal,
      url: action.payload.items[0].fields.footer
        .fields.locationIcon.fields.url,
      assetUrl: action.payload.items[0].fields.footer
        .fields.locationIcon.fields.icon.fields.file.url,
    },
  },
  bg: action.payload.items[0].fields.bg.fields.file.url,
}), defaultState);

export { reducer, defaultState };
