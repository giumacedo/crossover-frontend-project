import React, { Component } from 'react';
import TableRow from './TableRow';
import preload from '../../data.json';

class Table extends Component {
  state = {
    header: preload.tableHeader,
    cells: preload.elements,
    selected: ''
  };
  onSelect = id => {
    this.setState({ selected: id });
  };
  buildTableHeader = tableHeader => {
    const header = tableHeader.map(title => <div key={title}>{title}</div>);
    return header;
  };
  buildTableRow = tableRow => {
    const row = tableRow.map(element => (
      <TableRow
        key={element.id}
        selected={
          element.id === this.state.selected &&
          element.attributes.state !== 'pending'
        }
        {...element}
        onClick={this.onSelect}
      />
    ));
    return row;
  };
  render() {
    const tableHeader = this.buildTableHeader(this.state.header);
    const tableRow = this.buildTableRow(this.state.cells);
    return (
      <div className="custom-table">
        <div className="table-header">{tableHeader}</div>
        <div className="table-content">{tableRow}</div>
      </div>
    );
  }
}

export default Table;
