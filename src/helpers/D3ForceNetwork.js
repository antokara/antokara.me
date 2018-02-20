import * as d3 from 'd3';

class D3ForceNetwork {
  constructor({
    containerSelector, nodes, links, cssClasses: { hasChildren, expanded },
  }) {
    // make a copies of the nodes and links, so that we can safely modify them
    this.allNodes = nodes.map(item => ({ ...item }));
    this.allLinks = links.map(item => ({ ...item }));
    // perform the initial filtering of the nodes
    // with the dataset the reducer provided
    this.filterNodes();

    // the larger the number, the less space will be available
    // between the text and the edge of the node circle
    this.radiusModifier = 0.8;

    // maximum radius for each node circle
    // when the text is greater than that
    // the font-size will shrink to fit that
    this.maxRadius = 50;

    // maximum text length allowed
    // when the text is greater than that
    // the font-size will shrink to fit that
    this.maxLength = this.maxRadius / 5;

    // the multiplier to apply on the collision radius
    // if equal to 1 then the space between each node can be zero
    // by increasing this number, we guarantee the spacing between each node and
    // since it is a multiplier applied to the radius, it will apply proportionally...
    this.collisionRadiusModifier = 1.2;

    // the css classes to be used
    this.cssClasses = {
      hasChildren,
      expanded,
    };

    // store the container selector
    this.containerSelector = containerSelector;

    // create the SVG which will contain our network
    this.svg = d3
      .select(containerSelector)
      .append('svg');

    // Create the groups in the z-index order required.
    // That way, we can always add/remove elements inside the groups
    // at any order we see fit, while keeping the z-index correct at all times
    this.linksGroup = this.svg.append('g').attr('class', 'links');
    this.nodesGroup = this.svg.append('g').attr('class', 'nodes');
    this.labelsGroup = this.svg.append('g').attr('class', 'labels');

    // initial call
    this.resizeHandler();

    // make sure we resize/update on resize of window/viewport
    window.addEventListener('resize', this.resizeHandler);

    // bind this to our public methods
    this.destroy = this.destroy.bind(this);
  }

  /**
   * when user started the drag on a label or circle node
   *
   * @param {*} d
   */
  dragStarted(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    // set the fixed position to be the current one
    this.nodes[d.index].fx = d.x;
    this.nodes[d.index].fy = d.y;
  }

  /**
   * when user drags a label or circle node
   *
   * @param {*} d
   */
  dragged(d) {
    // set the fixed position to be the dragged one
    this.nodes[d.index].fx = d3.event.x;
    this.nodes[d.index].fy = d3.event.y;
  }

  /**
   * when user ended the drag on a label or circle node
   *
   * @param {*} d
   */
  dragEnded(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0);
    }
    // "release" from current cursor/drag position
    // in an attempt to "snap back" into the graph
    this.nodes[d.index].fx = null;
    this.nodes[d.index].fy = null;
  }

  /**
   * filters the nodes and edges using the expanded attribute and
   * create a new array of nodes/links with only the filtered subset
   */
  filterNodes() {
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
  }

  /**
   * calculates the radius of each node
   * using the textWidth provided and
   * imposing a maximum radius to the result
   *
   * @param {float} textWidth label text width as provided by the getComputedTextLength()
   * @return {float} radius to be applied on the node's circle
   */
  radius(textWidth) {
    let rad = textWidth * this.radiusModifier;
    if (rad > this.maxRadius) {
      rad = this.maxRadius;
    }
    return rad;
  }

  /**
   * calculates the font size to apply to the node's label
   * imposing a maximum length to the result.
   * When a label is over the limit, the font size gets shranked
   * to make it fit the node's circle radius
   *
   * @param {integer} length label text characters length of the node
   * @return {float} font-size in 'em' unit, to apply to the node's label
   */
  fontSize(length) {
    if (length > this.maxLength) {
      return this.maxLength / length;
    }
    return 1;
  }

  /**
   * click handler for label and node elements.
   * toggles the expanded state of the clicked node
   *
   * @param {*} d
   */
  toggleNode(d) {
    // take no action when clicking a node without children...
    if (!this.allNodes[d.id].hasChildren) {
      return;
    }
    // toggle this node
    this.allNodes[d.id].expanded = !this.allNodes[d.id].expanded;
    // if this is a collapse, then collapse all the children nodes in this branch as well
    if (!this.allNodes[d.id].expanded) {
      this.collapseNodes(d.id);
    }
    // create a new filtered set of nodes and update the simulation
    this.filterNodes();
    this.update();

    // update the class on the toggled node's circle
    this.nodesGroup.select(`circle[data-id="${d.id}"]`).attr('class', n => this.nodeCssClass(n));
  }

  /**
   * recursively collapses the children nodes of the node provided
   *
   * @param {string} id node id
   */
  collapseNodes(id) {
    // find and collapse its children
    this.allLinks.forEach((link) => {
      // if this is a link tied to this node
      if (link.source === id) {
        // if the target node has children and was expanded
        if (this.allNodes[link.target].hasChildren &&
          this.allNodes[link.target].expanded) {
          // collapse
          this.allNodes[link.target].expanded = false;
          // recurse
          this.collapseNodes(link.target);
        }
      }
    });
  }

  /**
   * finds the node using the id of the data item provided
   * this is required so that even with different/filtered datasets
   * the node attributes, remain the same...
   * @param {*} d node
   */
  findNode(d) {
    return this.allNodes[this.allNodes.findIndex(item => item.id === d.id)];
  }

  /**
   * returns the css class name of the given node which can be different
   * depending if there are children and its expanded state or not...
   *
   * @param {*} d
   */
  nodeCssClass(d) {
    const node = this.findNode(d);
    let cssClass = '';
    if (node.hasChildren) {
      cssClass = this.cssClasses.hasChildren;
    }
    if (node.expanded) {
      cssClass += ` ${this.cssClasses.expanded}`;
    }
    return cssClass;
  }

  resizeHandler() {
    // stores the svg's dimensions
    this.svgWidth = this.svg.style('width').replace('px', '');
    this.svgHeight = this.svg.style('height').replace('px', '');
    // update everything
    this.update();
  }

  /**
   * updates the links, nodes, labels, force simulation and restarts it
   */
  update() {
    // used in some non-arrow functions that we need two different contexes
    const that = this;

    // .data defines the enter and exit selections
    this.link = this.linksGroup.selectAll('line').data(this.links, d => d.id);
    this.link.enter().append('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    this.link.exit().remove();
    // select the elements now
    this.link = this.linksGroup.selectAll('line');

    // .data defines the enter and exit selections
    this.label = this.labelsGroup.selectAll('text').data(this.nodes, d => d.id);
    this.label.enter().append('text').attr('x', d => d.x).attr('y', d => d.y)
      .text(d => (d.label))
      .attr('font-size', d => `${this.fontSize(d.label.length)}em`)
      .each(function calcTextWidth(d) {
        const node = that.findNode(d);
        node.textWidth = this.getComputedTextLength();
        node.radius = that.radius(node.textWidth);
      })
      .on('click', this.toggleNode.bind(this))
      .call(d3.drag()
        .on('start', this.dragStarted.bind(this))
        .on('drag', this.dragged.bind(this))
        .on('end', this.dragEnded.bind(this)));
    this.label.exit().remove();
    // select the elements now
    this.label = this.labelsGroup.selectAll('text');

    // .data defines the enter and exit selections
    this.node = this.nodesGroup.selectAll('circle').data(this.nodes, d => d.id);
    this.node.enter().append('circle').attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('data-id', d => this.findNode(d).id)
      .attr('data-level', d => this.findNode(d).level)
      .attr('r', d => this.findNode(d).radius)
      .attr('class', d => this.nodeCssClass(d))
      .on('click', this.toggleNode.bind(this))
      .call(d3.drag()
        .on('start', this.dragStarted.bind(this))
        .on('drag', this.dragged.bind(this))
        .on('end', this.dragEnded.bind(this)));
    this.node.exit().remove();
    // select the elements now
    this.node = this.nodesGroup.selectAll('circle');

    // create the simulation for our nodes and links
    // explicitly stop / restart the simulation to avoid unnecessary ticks
    // until all forces have been applied and the tick handler added
    this.simulation = d3.forceSimulation().stop()
      .nodes(this.nodes)
      .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))
      .force('link', d3.forceLink().links(this.links))
      .force('charge', d3.forceManyBody())
      .force('collision', d3.forceCollide().radius(d =>
        this.findNode(d).radius * this.collisionRadiusModifier))
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
  }

  /**
   * unbinds all event handlers and cleans up
   *
  */
  destroy() {
    // unbind all event handlers
    window.removeEventListener('resize', this.resizeHandler);
    this.simulation.stop();
    this.label.enter().on('click', null).call(d3.drag()
      .on('start', null)
      .on('drag', null)
      .on('end', null));
    this.node.enter().on('click', null).call(d3.drag()
      .on('start', null)
      .on('drag', null)
      .on('end', null));
    // clean up
    delete this.allNodes;
    delete this.allLinks;
    delete this.nodes;
    delete this.links;
    d3.select(this.containerSelector).selectAll('*').remove();
  }
}

export default D3ForceNetwork;
