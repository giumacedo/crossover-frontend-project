import React, { Component } from 'react';
import Moment from 'react-moment';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props
    };
  }
  render() {
    return (
      <div
        key={this.state.data.id}
        className={`table-row ${this.state.data.attributes.state}`}
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

export default TableRow;
