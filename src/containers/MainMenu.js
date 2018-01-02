import { connect } from 'react-redux';
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

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
