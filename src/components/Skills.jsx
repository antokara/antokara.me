import React from 'react';
import PropTypes from 'prop-types';
import vis from 'vis';
import style from './Skills.pcss';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    props.getSkills();
    this.props = props;
  }

  render() {
    // @todo properly initialize and check for previously initialized networks
    if (this.props.nodes.length) {
      this.network = new vis.Network(
        document.getElementById('skillsNetwork'), {
          nodes: this.props.nodes,
          edges: this.props.edges,
        },
        {
          nodes: {
            shape: 'circle',
          },
          interaction: {
            dragNodes: true,
            dragView: false,
            selectable: false,
          },
        },
      );
      this.network.on('click', (params) => {
        const nodeId = this.network.getNodeAt(params.pointer.DOM);
        const node = this.props.nodes.find(item => item.id === nodeId);
        // eslint-disable-next-line no-console
        console.log(node);
      });
    }

    return (
      <div className={style.skills}>
        <div id="skillsNetwork" />
      </div>
    );
  }
}

// @todo cleanup

Skills.propTypes = {
  getSkills: PropTypes.func.isRequired,
  nodes: PropTypes.arrayOf().isRequired,
  edges: PropTypes.arrayOf().isRequired,
};

export default Skills;
