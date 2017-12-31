import React from 'react';
import PropTypes from 'prop-types';
import HeaderIcons from './HeaderIcons';
import style from './Header.pcss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    props.getHeader();
  }

  render() {
    return (
      <header className={style.header}>
        <div className={style.text}>
          <div className={style.upper}>
            <div>{this.props.first}</div>
            <div>{this.props.second}</div>
          </div>
          <div className={style.lower}>
            <div>{this.props.third}</div>
            <div>{this.props.fourth}</div>
          </div>
        </div>
        <div className={style.icons}>
          <HeaderIcons icons={this.props.icons} />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  getHeader: PropTypes.func.isRequired,
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
};

Header.defaultProps = {
  first: '',
  second: '',
  third: '',
  fourth: '',
  icons: [],
};


export default Header;
