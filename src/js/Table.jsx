import React, { Component } from 'react';
import preload from '../../data.json';

class Table extends Component {
  state = {
    header: preload.tableHeader,
    cells: preload.elements
  };
  render() {
    const tableHeader = this.state.header.map(title => <div>{title}</div>);
    const tableRow = this.state.cells.map(element => (
      <div className={`table-row ${element.attributes.state}`}>
        <div>
          {element.type} {'\u00A0'} {element.id}
        </div>
        <div>
          {element.attributes.owner}
          {'\u00A0'}
        </div>
        <div>
          {element.attributes.timeStarted}
          {'\u00A0'}
        </div>
        <div className="state"> {element.attributes.state}</div>
        <div className="status">
          <div className={`square ${element.attributes.metric}`} />
        </div>
        <div className="status">
          <div className={`square ${element.attributes.build}`} />
        </div>
        <div className="status">
          <div className={`square ${element.attributes.unitTest}`} />
        </div>
        <div className="status">
          <div className={`square ${element.attributes.functionalTest}`} />
        </div>
      </div>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="custom-table">
            <div className="table-header">{tableHeader}</div>
            <div className="table-content">{tableRow}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
