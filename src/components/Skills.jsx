import React from 'react';
import PropTypes from 'prop-types';
import D3ForceNetwork from 'Helpers/D3ForceNetwork';
import style from './Skills.pcss';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    props.getSkills();
  }

  componentWillMount() {
    if (this.d3fn) {
      this.d3fn.destroy();
      delete this.d3fn;
    }
  }

  render() {
    if (this.props.nodes.length && !this.d3fn) {
      this.d3fn = new D3ForceNetwork({
        containerSelector: `div.${style.skills}`,
        nodes: this.props.nodes,
        links: this.props.edges,
        cssClasses: {
          hasChildren: style.hasChildren,
          expanded: style.expanded,
        },
      });
    }

    return (
      <div className={style.skills} />
    );
  }
}

Skills.propTypes = {
  getSkills: PropTypes.func.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    hasChildren: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  edges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    source: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired,
  })).isRequired,
};

export default Skills;
