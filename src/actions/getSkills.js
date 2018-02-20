import { GET_SKILLS } from 'Constants/actionTypes';
import { createAction } from 'redux-actions';
import ContentfulClient from 'Helpers/ContentfulClient';

const cc = new ContentfulClient();
const getSkills = createAction(GET_SKILLS, async () => cc.getEntries({
  'sys.id': cc.entries.skills,
  include: 5,
}));

export default getSkills;
