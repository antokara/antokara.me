import React from 'react';
import PropTypes from 'prop-types';
import Routes from 'Components/Routes.jsx';
import Header from 'Components/Header.jsx';
import MainMenu from 'Components/MainMenu.jsx';
import style from './Contents.pcss';

const Contents = props => (
  <div className={style.contents} >
    <Header {...props.theme.header} />
    <MainMenu {...props.theme.mainMenu} />
    <Routes />
  </div>
);

Contents.propTypes = {
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

Contents.defaultProps = {
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

export default Contents;
