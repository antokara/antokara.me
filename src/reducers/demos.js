import { GET_DEMOS } from 'Constants/actionTypes';
import { handleAction } from 'redux-actions';

const defaultState = {
  projects: [],
  checkmark: null,
};

const demos = handleAction(
  GET_DEMOS,
  (state, action) => {
    const newState = {
      checkmark: action.payload.items[0].fields.checkmark.fields.file.url,
      projects: [...state.projects],
    };
    action.payload.items[0].fields.projects.forEach((project) => {
      newState.projects.push({
        title: project.fields.title,
        icon: {
          title: project.fields.icon.fields.title,
          url: project.fields.icon.fields.file.url,
        },
        description: project.fields.description,
        features: project.fields.features.map(feature => ({
          label: feature.fields.label,
          url: feature.fields.url,
        })),
        links: project.fields.links.map(feature => ({
          label: feature.fields.label,
          url: feature.fields.url,
        })),
      });
    });
    return newState;
  },
  defaultState,
);

export default demos;
