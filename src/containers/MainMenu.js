import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import getMainMenu from 'Actions/getMainMenu';
import MainMenu from 'Components/MainMenu.jsx';

const mapStateToProps = state => ({
  ...state.mainMenu,
});

const mapDispatchToProps = dispatch => ({
  getMainMenu: () => {
    dispatch(getMainMenu());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
