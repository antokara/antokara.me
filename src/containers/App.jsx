import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Routes from 'Components/Routes.jsx';
import getTheme from 'Actions/getTheme';
import Header from 'Components/Header.jsx';
import MainMenu from 'Components/MainMenu.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.getTheme();
  }

  render() {
    return (
      <div>
        <Header {...this.props.theme.header} />
        <MainMenu {...this.props.theme.mainMenu} />
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  getTheme: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    header: PropTypes.shape({
      first: PropTypes.string,
      second: PropTypes.string,
      third: PropTypes.string,
      fourth: PropTypes.string,
      icons: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
        assetUrl: PropTypes.string,
        internal: PropTypes.bool,
      })),
    }),
    mainMenu: PropTypes.shape({
      icons: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
        assetUrl: PropTypes.string,
        internal: PropTypes.bool,
      })),
    }),
  }),
};

App.defaultProps = {
  theme: {
    header: {
      first: '',
      second: '',
      third: '',
      fourth: '',
      icons: [],
    },
    mainMenu: {
      icons: [],
    },
  },
};

const mapStateToProps = state => ({
  theme: state.theme,
});

const mapDispatchToProps = dispatch => ({
  getTheme: () => {
    dispatch(getTheme());
  },
});

// for usage of withRouter
// @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
