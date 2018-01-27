import { connect } from 'react-redux';
import getSkills from 'Actions/getSkills';
import Skills from 'Components/Skills.jsx';

const mapStateToProps = state => ({
  ...state.skills,
});

const mapDispatchToProps = dispatch => ({
  getSkills: () => {
    dispatch(getSkills());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
