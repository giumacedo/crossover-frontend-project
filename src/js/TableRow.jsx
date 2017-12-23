import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props
    };
  }
  handleClick = () => {
    this.props.onClick(this.props.id);
  };
  render() {
    return (
      <div
        key={this.state.data.id}
        className={`table-row ${this.props.selected ? ' selected' : ''} ${this
          .state.data.attributes.state}`}
        onClick={this.handleClick}
        role="presentation"
      >
        <div className="table-row-header">
          <i>{this.state.data.type}</i> {'\u00A0'}
          <span>{this.state.data.id}</span>
        </div>
        <div className="table-row-header">
          {this.state.data.attributes.owner}
          {'\u00A0'}
        </div>
        <div className="table-row-header">
          <Moment format="MM/DD/YYYY HH:mm">
            {this.state.data.attributes.timeStarted}
          </Moment>
        </div>
        <div className="table-row-header state">
          {' '}
          {this.state.data.attributes.state}
        </div>
        <div className="table-row-header status">
          <div className={`square ${this.state.data.attributes.metric}`} />
        </div>
        <div className="table-row-header status">
          <div className={`square ${this.state.data.attributes.build}`} />
        </div>
        <div className="table-row-header status">
          <div className={`square ${this.state.data.attributes.unitTest}`} />
        </div>
        <div className="table-row-header status">
          <div
            className={`square ${this.state.data.attributes.functionalTest}`}
          />
        </div>
        <div className="table-row-contet">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </div>
      </div>
    );
  }
}

TableRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};

export default TableRow;
