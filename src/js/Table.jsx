import React, { Component } from 'react';
import preload from '../../data.json';

class Table extends Component {
  state = {
    header: preload.tableHeader,
    cells: preload.elements
  };
  render() {
    const tableHeader = this.state.header.map(title => (
      <div className="table-header-cell"> {title}</div>
    ));
    const tableRow = this.state.cells.map(element => (
      <div className={`table-row ${element.attributes.state}`}>
        <div className="table-body-cell">
          <span>{element.type} </span>
          <span>{element.id}</span>
        </div>
        <div className="table-body-cell"> {element.attributes.owner}</div>
        <div className="table-body-cell"> {element.attributes.timeStarted}</div>
        <div className="table-body-cell state"> {element.attributes.state}</div>
        <div className="table-body-cell">
          <div className={`square ${element.attributes.metric}`} />
        </div>
        <div className="table-body-cell">
          <div className={`square ${element.attributes.build}`} />
        </div>
        <div className="table-body-cell">
          <div className={`square ${element.attributes.unitTest}`} />
        </div>
        <div className="table-body-cell">
          <div className={`square ${element.attributes.functionalTest}`} />
        </div>
      </div>
    ));
    return (
      <div className="resp-table">
        <div className="table-header">{tableHeader}</div>
        <div className="table-body">{tableRow}</div>
      </div>
    );
  }
}

export default Table;
