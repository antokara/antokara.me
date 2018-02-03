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
      // create filtered arrays of nodes and their links based on expanded status.
      // at the same time, make sure the ids are remapped...
      const nodes = [];
      const links = [];
      this.props.edges.forEach((link) => {
        // if the node of this link's source is expanded,
        // we need the source node, target node and the link itself
        if (this.props.nodes[link.source].expanded) {
          // attempt to find the link (source/target) nodes in our filtered nodes array
          // if not found, add them and remap their ids
          const nLink = {};
          nLink.source = nodes.findIndex(node => node.id === link.source);
          if (nLink.source === -1) {
            nLink.source = nodes.length;
            nodes.push({ ...this.props.nodes[link.source], id: nLink.source });
          }
          nLink.target = nodes.findIndex(node => node.id === link.target);
          if (nLink.target === -1) {
            nLink.target = nodes.length;
            nodes.push({ ...this.props.nodes[link.target], id: nLink.target });
          }
          // finally, add the link
          links.push(nLink);
        }
      });

      // eslint-disable-next-line no-debugger
      // debugger;
      // border: '#205e95',
      // background: '#85b9e6',
      // highlight: {
      //   border: '#205e95',
      //   background: '#99c5eb',
      // },

      const width = 1960;
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
        .data(links)
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
          nodes[d.id].radius = radius(nodes[d.id].textWidth);
        });

      const node = svg.select('g.nodes')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .style('fill', 'white')
        .attr('r', d => d.radius);

      const simulation = d3.forceSimulation()
        .nodes(nodes)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink()
          .links(links)
          .distance(l => (l.source.radius + l.target.radius) * 2))
        .force('charge', d3.forceManyBody())
        .force('collision', d3.forceCollide().radius(d => d.radius));

      simulation.on('tick', () => {
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
    expanded: PropTypes.bool.isRequired,
  })).isRequired,
  edges: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired,
  })).isRequired,
};

export default Skills;
