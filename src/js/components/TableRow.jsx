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
  buildTableRowContentByType = rowContent => {
    let content;
    let resultButton;

    if (rowContent.state === 'accepted') {
      resultButton = <button>Merge Build</button>;
    }
    if (rowContent.state === 'rejected') {
      resultButton = <button>Find Issues</button>;
    }
    if (rowContent.state === 'complete') {
      resultButton = (
        <div>
          <button>Deploy</button> <span>to:</span>
          <select>Production</select>
        </div>
      );
    }

    switch (rowContent.type) {
      case 'metrics':
        content = (
          <div className="section-content">
            <div className="section-item">
              <div>{rowContent.test.value}</div>
              <div>{rowContent.test.title}</div>
            </div>
            <div className="section-item">
              <div>{rowContent.maintainability.value}</div>
              <div>{rowContent.maintainability.title}</div>
            </div>
            <div className="section-item">
              <div>{rowContent.security.value}</div>
              <div>{rowContent.security.title}</div>
            </div>
            <div className="section-item">
              <div>{rowContent.workmanship.value}</div>
              <div>{rowContent.workmanship.title}</div>
            </div>
          </div>
        );
        break;

      case 'build':
        content = (
          <div className="section-content">
            <div className="section-item">
              <div>Debug</div>
            </div>
            <div className="section-item">
              <div>Release</div>
            </div>
            <div className="section-item-100">
              <Moment format="HH:mm - MM/DD/YYYY ">
                <div>{rowContent.time}</div>
              </Moment>
            </div>
          </div>
        );
        break;

      case 'unitTest':
        content = (
          <div className="section-content">
            <div className="section-item">
              <div>Debug</div>
            </div>
            <div className="section-item">
              <div>Release</div>
            </div>
            <div className="section-item-100">
              <div>{rowContent.time}</div>
            </div>
          </div>
        );
        break;

      case 'functionalTest':
        content = (
          <div className="section-content">
            <div className="section-item">
              <div>Debug</div>
            </div>
            <div className="section-item">
              <div>Release</div>
            </div>
            <div className="section-item-100">
              <div>{rowContent.time}</div>
            </div>
          </div>
        );
        break;

      case 'result':
        content = (
          <div className="section-content result">
            <div className="section-item-100">
              <div>{rowContent.statusTitle}</div>
            </div>
            <div className="section-item-100">
              <div>{rowContent.statusText}</div>
            </div>
            <div className="section-item-100">{resultButton}</div>
          </div>
        );
        break;

      default:
        return null;
    }
    return content;
  };
  buildTableRowContent = tableRowContent => {
    const content = tableRowContent.map(rowContent => (
      <div key={rowContent.title} className={`section ${rowContent.status}`}>
        <div className="section-title">{rowContent.title}</div>
        {this.buildTableRowContentByType(rowContent)}
      </div>
    ));
    return content;
  };
  handleClick = () => {
    // update parent state with element selected
    this.props.onClick(this.props.id);
  };
  render() {
    const tableRowContent = this.buildTableRowContent(this.state.data.content);
    return (
      <div
        className={`table-row ${this.props.selected ? ' selected' : ''} ${this
          .state.data.attributes.state}`}
      >
        <div
          className="table-row-header"
          key={this.state.data.id}
          // check if element has received props selected
          onClick={this.handleClick}
          role="presentation"
        >
          <div className="header-item">
            <i>{this.state.data.type}</i> {'\u00A0'}
            <span className="id">{this.state.data.id}</span>
          </div>
          <div className="header-item">
            {this.state.data.attributes.owner}
            {'\u00A0'}
          </div>
          <div className="header-item">
            <Moment format="MM/DD/YYYY HH:mm">
              {this.state.data.attributes.timeStarted}
            </Moment>
          </div>
          <div className="header-item state">
            {' '}
            {this.state.data.attributes.state}
          </div>
          <div className="header-item status">
            <div className={`square ${this.state.data.attributes.metric}`} />
          </div>
          <div className="header-item status">
            <div className={`square ${this.state.data.attributes.build}`} />
          </div>
          <div className="header-item status">
            <div className={`square ${this.state.data.attributes.unitTest}`} />
          </div>
          <div className="header-item status">
            <div
              className={`square ${this.state.data.attributes.functionalTest}`}
            />
          </div>
        </div>
        <div className="table-row-contet">{tableRowContent}</div>
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
