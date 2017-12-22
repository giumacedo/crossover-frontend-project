import React, { Component } from 'react';
import preload from '../../data.json';

class Table extends Component {
  state = {
    header: preload.tableHeader
  };
  render() {
    return <div className="resp-table">{this.state.header}</div>;
  }
}

export default Table;
