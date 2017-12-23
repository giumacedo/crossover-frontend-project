import React, { Component } from 'react';
import TableRow from './TableRow';
import preload from '../../../data.json';

class Table extends Component {
  state = {
    header: preload.tableHeader,
    cells: preload.elements,
    selected: -1
  };
  onSelect = id => {
    if (this.state.selected === id) {
      this.setState({ selected: -1 });
    } else {
      this.setState({ selected: id });
    }
  };
  buildTableHeader = tableHeader => {
    const header = tableHeader.map(title => <div key={title}>{title}</div>);
    return header;
  };
  buildTableRow = tableRow => {
    const row = tableRow.map(element => (
      <TableRow
        key={element.id}
        // props to check if element is selected or its state is pending or running
        selected={
          element.id === this.state.selected &&
          element.attributes.state !== 'pending' &&
          element.attributes.state !== 'running'
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
