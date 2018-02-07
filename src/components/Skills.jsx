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
      // make a copies of the nodes and edges, so that we can modify them
      // since props, are meant to be immutable...
      this.allNodes = this.props.nodes.map(item => ({ ...item }));
      this.allLinks = this.props.edges.map(item => ({ ...item }));

      /**
       * filters the nodes and edges using the expanded attribute and
       * create a new array of nodes/links with only the filtered subset
       *
       * @todo remove nodes/edges that belong to non expanded children nodes...
       */
      this.filterNodes = () => {
        // create filtered arrays of nodes and their links based on expanded status.
        // at the same time, make sure the ids are remapped...

        // start with root node because if root node is collapsed
        // there will be not links to add and the root node will not be added either...
        this.nodes = [{
          index: 0,
          ...this.allNodes[0],
        }];

        // start without links
        this.links = [];

        this.allLinks.forEach((link) => {
          // if the node of this link's source is expanded,
          // we need the source node, target node and the link itself
          if (this.allNodes[link.source].expanded) {
            // attempt to find the link (source/target) nodes in our filtered nodes array
            // if not found, add them and add indexes
            const nLink = { id: link.id };
            nLink.source = this.nodes.findIndex(node => node.id === link.source);
            if (nLink.source === -1) {
              nLink.source = this.nodes.length;
              this.nodes.push({ ...this.allNodes[link.source], index: nLink.source });
            }
            nLink.target = this.nodes.findIndex(node => node.id === link.target);
            if (nLink.target === -1) {
              nLink.target = this.nodes.length;
              this.nodes.push({ ...this.allNodes[link.target], index: nLink.target });
            }
            // finally, add the link
            this.links.push(nLink);
          }
        });
      };

      // perform the initial filtering of the nodes
      // with the dataset the reducer provided
      this.filterNodes();

      // the larger the number, the less space will be available
      // between the text and the edge of the node circle
      const radiusModifier = 0.8;

      // maximum radius for each node circle
      // when the text is greater than that
      // the font-size will shrink to fit that
      const maxRadius = 50;

      // maximum text length allowed
      // when the text is greater than that
      // the font-size will shrink to fit that
      const maxLength = maxRadius / 5;

      // the multiplier to apply on the collision radius
      // if equal to 1 then the space between each node can be zero
      // by increasing this number, we guarantee the spacing between each node and
      // since it is a multiplier applied to the radius, it will apply proportionally...
      const collisionRadiusModifier = 1.2;

      /**
       * calculates the radius of each node
       * using the textWidth provided and
       * imposing a maximum radius to the result
       *
       * @param {float} textWidth label text width as provided by the getComputedTextLength()
       * @return {float} radius to be applied on the node's circle
       */
      const radius = (textWidth) => {
        let rad = textWidth * radiusModifier;
        if (rad > maxRadius) {
          rad = maxRadius;
        }
        return rad;
      };

      /**
       * calculates the font size to apply to the node's label
       * imposing a maximum length to the result.
       * When a label is over the limit, the font size gets shranked
       * to make it fit the node's circle radius
       *
       * @param {integer} length label text characters length of the node
       * @return {float} font-size in 'em' unit, to apply to the node's label
       */
      const fontSize = (length) => {
        if (length > maxLength) {
          return maxLength / length;
        }
        return 1;
      };

      // create the SVG which will contain our network
      const svg = d3
        .select(`div.${style.skills}`)
        .append('svg');

      // store the svg's dimensions
      this.svgWidth = svg.style('width').replace('px', '');
      this.svgHeight = svg.style('height').replace('px', '');

      // Create the groups in the z-index order required.
      // That way, we can always add/remove elements inside the groups
      // at any order we see fit, while keeping the z-index correct at all times
      const linksGroup = svg.append('g').attr('class', 'links');
      const nodesGroup = svg.append('g').attr('class', 'nodes');
      const labelsGroup = svg.append('g').attr('class', 'labels');

      /**
       * click handler for label and node elements.
       * toggles the expanded state of the clicked node
       *
       * @param {*} d
       */
      const that = this;
      this.toggleNode = function toggleNode(d) {
        // take no action when clicking a node without children...
        if (!that.allNodes[d.id].hasChildren) {
          return;
        }
        that.allNodes[d.id].expanded = !that.allNodes[d.id].expanded;
        that.filterNodes();
        that.update();
        nodesGroup.select(`circle[data-id="${d.id}"]`).attr('class', n => that.nodeCssClass(n));
      };

      // finds the node using the id of the data item provided
      // this is required so that even with different/filtered datasets
      // the node attributes, remain the same...
      this.findNode = d => this.allNodes[this.allNodes.findIndex(item => item.id === d.id)];

      /**
       * returns the css class name of the given node which can be different
       * depending if there are children and its expanded state or not...
       *
       * @param {*} d
       */
      this.nodeCssClass = (d) => {
        const node = this.findNode(d);
        let cssClass = '';
        if (node.hasChildren) {
          cssClass = style.hasChildren;
        }
        if (node.expanded) {
          cssClass += ` ${style.expanded}`;
        }
        return cssClass;
      };

      /**
       * updates the links, nodes, labels, force simulation and restarts it
       */
      this.update = () => {
        // .data defines the enter and exit selections
        this.link = linksGroup.selectAll('line').data(this.links, d => d.id);
        this.link.enter().append('line');
        this.link.exit().remove();
        // select the elements now
        this.link = linksGroup.selectAll('line');

        // .data defines the enter and exit selections
        this.label = labelsGroup.selectAll('text').data(this.nodes, d => d.id);
        this.label.enter().append('text')
          .text(d => (d.label))
          .attr('font-size', d => `${fontSize(d.label.length)}em`)
          .each(function calcTextWidth(d) {
            const node = that.findNode(d);
            node.textWidth = this.getComputedTextLength();
            node.radius = radius(node.textWidth);
          })
          .on('click', this.toggleNode);
        this.label.exit().remove();
        // select the elements now
        this.label = labelsGroup.selectAll('text');

        // .data defines the enter and exit selections
        this.node = nodesGroup.selectAll('circle').data(this.nodes, d => d.id);
        this.node.enter().append('circle')
          .attr('data-id', d => this.findNode(d).id)
          .attr('r', d => this.findNode(d).radius)
          .attr('class', d => this.nodeCssClass(d))
          .on('click', this.toggleNode);
        this.node.exit().remove();
        // select the elements now
        this.node = nodesGroup.selectAll('circle');

        // create the simulation for our nodes and links
        // explicitly stop / restart the simulation to avoid unnecessary ticks
        // until all forces have been applied and the tick handler added
        this.simulation = d3.forceSimulation().stop()
          .nodes(this.nodes)
          .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))
          .force('link', d3.forceLink().links(this.links))
          .force('charge', d3.forceManyBody())
          .force('collision', d3.forceCollide().radius(d =>
            this.findNode(d).radius * collisionRadiusModifier))
          .on('tick', () => {
            this.node
              .attr('cx', d => (d.x))
              .attr('cy', d => (d.y));
            this.link
              .attr('x1', d => (d.source.x))
              .attr('y1', d => (d.source.y))
              .attr('x2', d => (d.target.x))
              .attr('y2', d => (d.target.y));
            this.label
              .attr('x', d => (d.x))
              .attr('y', d => (d.y));
          })
          .restart();
      };

      // update links, nodes, labels and run the simulation...
      this.update();
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
