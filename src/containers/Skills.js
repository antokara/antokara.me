import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getSkills from 'Actions/getSkills';
import Skills from 'Components/Skills.jsx';

const mapStateToProps = state => ({
  ...state.skills,
});

const mapDispatchToProps = dispatch => ({
  getSkills: bindActionCreators(getSkills, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
