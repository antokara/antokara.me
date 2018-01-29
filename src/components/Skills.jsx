import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
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
      // border: '#205e95',
      // background: '#85b9e6',
      // highlight: {
      //   border: '#205e95',
      //   background: '#99c5eb',
      // },

      // this.network.on('click', (params) => {
      //   const nodeId = this.network.getNodeAt(params.pointer.DOM);
      //   const node = this.props.nodes.find(item => item.id === nodeId);
      //   // eslint-disable-next-line no-console
      //   console.log(node);
      //   node.expanded = true;

      // });
      const width = 960;
      const height = 500;
      const data = [
        {
          label: 'skills',
          expanded: true,
          children: [
            { label: 'frontend' },
            { label: 'backend' },
          ],
        },
      ];

      const svg = d3
        .select(`div.${style.skills}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .style('r', d => d.label.length * 5)
        .style('cx', '50')
        .style('cy', '50')
        .style('fill', 'white')
        .style('stroke', 'black')
        .text(d => d.label);
    }

    return (
      <div className={style.skills} />
    );
  }
}

// @todo cleanup

Skills.propTypes = {
  getSkills: PropTypes.func.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
  })).isRequired,
  edges: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  })).isRequired,
};

export default Skills;
