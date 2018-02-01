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
      // make a copy since props should be read-only and
      // we want to modify this one...
      const nodes = [...this.props.nodes];
      // border: '#205e95',
      // background: '#85b9e6',
      // highlight: {
      //   border: '#205e95',
      //   background: '#99c5eb',
      // },

      const width = 960;
      const height = 500;

      // const svg = d3
      //   .select(`div.${style.skills}`)
      //   .append('svg')
      //   .attr('width', width)
      //   .attr('height', height)
      //   .selectAll('circle')
      //   .data(data)
      //   .enter()
      //   .append('circle')
      //   .style('r', d => d.label.length * 5)
      //   .style('cx', '50')
      //   .style('cy', '50')
      //   .style('fill', 'white')
      //   .style('stroke', 'black')
      //   .text(d => d.label);

      const svg = d3
        .select(`div.${style.skills}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      // create the links/edges as the lowest z-index
      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(this.props.edges)
        .enter()
        .append('line');

      const modifier = 0.8;
      const maxRadius = 50;
      const maxLength = maxRadius / 5;
      const radius = (textWidth) => {
        if (textWidth > maxRadius) {
          return maxRadius;
        }
        return textWidth * modifier;
      };

      const fontSize = (length) => {
        if (length > maxLength) {
          return maxLength / length;
        }
        return 1;
      };

      // create the nodes group as the mid z-index
      svg.append('g').attr('class', 'nodes');

      const label = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .text(d => (d.label))
        .attr('font-size', d => `${fontSize(d.label.length)}em`)
        .each(function calcTextWidth(d) {
          nodes[d.id].textWidth = this.getComputedTextLength();
        });

      const node = svg.select('g.nodes')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .style('fill', 'white')
        .attr('r', d => radius(nodes[d.id].textWidth));

      const simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => (d.id)))
        .force('charge', d3.forceManyBody().strength(-350).distanceMax(200))
        .force('center', d3.forceCenter(width / 2, height / 2));

      simulation.nodes(nodes).on('tick', () => {
        node
          .attr('cx', d => (d.x))
          .attr('cy', d => (d.y));
        link
          .attr('x1', d => (d.source.x))
          .attr('y1', d => (d.source.y))
          .attr('x2', d => (d.target.x))
          .attr('y2', d => (d.target.y));
        label
          .attr('x', d => (d.x))
          .attr('y', d => (d.y));
      });

      simulation.force('link').links(this.props.edges);
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
