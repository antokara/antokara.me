import {
  GET_SKILLS,
} from 'Constants/actionTypes';
import { handleAction } from 'redux-actions';

const defaultState = {
  nodes: [],
  edges: [],
};

/**
 * generates the network of nodes and edges,
 * ready to be used in vis.network to avoid unessesary
 * extra parsing/iteration inside the component
 *
 * @param {integer} parentId id of the parent node
 * @param {integer} level zero based level of node in hierarchy
 * @param {object} field the field retrieved from contentful
 * @param {array} nodes the array of nodes
 * @param {array} edges the array of edges
 */
const generateNetwork = (parentId, level, field, nodes, edges) => {
  // add this skill
  const id = nodes.length;
  nodes.push({
    id,
    label: field.name,
    level,
    expanded: level < 2,
    hasChildren: Boolean(field.skills),
  });
  if (parentId !== null) {
    edges.push({
      id: edges.length,
      source: parentId,
      target: id,
    });
  }
  // add children skills
  if (field.skills) {
    field.skills.forEach(element => generateNetwork(id, level + 1, element.fields, nodes, edges));
  }
};

const skills = handleAction(GET_SKILLS, (state, action) => {
  const nodes = [];
  const edges = [];
  generateNetwork(null, 0, action.payload.items[0].fields.skill.fields, nodes, edges);
  return {
    ...state,
    nodes,
    edges,
  };
}, defaultState);

export default skills;
