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
        <div>
          {this.state.data.type} {'\u00A0'} {this.state.data.id}
        </div>
        <div>
          {this.state.data.attributes.owner}
          {'\u00A0'}
        </div>
        <div>
          <Moment format="MM/DD/YYYY HH:mm">
            {this.state.data.attributes.timeStarted}
          </Moment>
        </div>
        <div className="state"> {this.state.data.attributes.state}</div>
        <div className="status">
          <div className={`square ${this.state.data.attributes.metric}`} />
        </div>
        <div className="status">
          <div className={`square ${this.state.data.attributes.build}`} />
        </div>
        <div className="status">
          <div className={`square ${this.state.data.attributes.unitTest}`} />
        </div>
        <div className="status">
          <div
            className={`square ${this.state.data.attributes.functionalTest}`}
          />
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
