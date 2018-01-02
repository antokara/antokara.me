import React from 'react';
import PropTypes from 'prop-types';
import IconLinks from './IconLinks';
import style from './MainMenu.pcss';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    props.getMainMenu();
  }

  render() {
    return (
      <div className={style.mainMenu}>
        <IconLinks icons={this.props.icons} />
      </div>
    );
  }
}

MainMenu.propTypes = {
  getMainMenu: PropTypes.func.isRequired,
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })),
};

MainMenu.defaultProps = {
  icons: [],
};


export default MainMenu;
