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
      resultButton = (
        <button className="action-button">
          {' '}
          <i className="icon fa fa-search" aria-hidden="true" />
          <span>Merge Build</span>
        </button>
      );
    }
    if (rowContent.state === 'rejected') {
      resultButton = <button className="action-button">Find Issues</button>;
    }
    if (rowContent.state === 'complete') {
      resultButton = (
        <div>
          <div className="action">
            <button className="action-button">Deploy</button> <span>to:</span>
          </div>
          <div className="action">
            <select className="action-select">
              <option value="production">Production</option>
            </select>
          </div>
        </div>
      );
    }

    switch (rowContent.type) {
      case 'metrics':
        content = (
          <div className="section-content">
            <div className="section-item">
              <div className={`arrow ${rowContent.test.type}`}>
                <i className="arrow-triangle" />
                <div className="arrow-base">{rowContent.test.value}</div>
              </div>
              <div>{rowContent.test.title}</div>
            </div>
            <div className="section-item">
              <div className={`arrow ${rowContent.maintainability.type}`}>
                <i className="arrow-triangle" />
                <div className="arrow-base">
                  {rowContent.maintainability.value}
                </div>
              </div>
              <div>{rowContent.maintainability.title}</div>
            </div>
            <div className="section-item">
              <div className={`arrow ${rowContent.security.type}`}>
                <i className="arrow-triangle" />
                <div className="arrow-base">{rowContent.security.value}</div>
              </div>
              <div>{rowContent.security.title}</div>
            </div>
            <div className="section-item">
              <div className={`arrow ${rowContent.workmanship.type}`}>
                <i className="arrow-triangle" />
                <div className="arrow-base">{rowContent.workmanship.value}</div>
              </div>
              <div>{rowContent.workmanship.title}</div>
            </div>
          </div>
        );
        break;

      case 'build':
        content = (
          <div>
            <div className="section-content build">
              <div className="section-item">
                <i className="fa fa-desktop" />
                <div>Debug</div>
              </div>
              <div className="section-item">
                <i className="fa fa-desktop" />
                <div>Release</div>
              </div>
            </div>
            <div className="section-footer">
              <Moment format="HH:mm - MM/DD/YYYY">{rowContent.time}</Moment>
            </div>
          </div>
        );
        break;

      case 'unitTest':
      case 'functionalTest':
        content = (
          <div className="section-test">
            <div className="section-content test">
              <div className="section-item">
                <div className="pie-chart" />
              </div>
              <div className="section-item">
                <div
                  className={`big ${rowContent.passed >= 70
                    ? ' test-good'
                    : 'test-regular'} `}
                >
                  {rowContent.passed}%
                </div>
                <div className="small">tests passed</div>
              </div>
            </div>
            <div className="section-footer">
              <div className="bold">{rowContent.covered}%</div>
              <div className="small">code covered</div>
            </div>
          </div>
        );
        break;

      case 'result':
        content = (
          <div>
            <div className="section-content">
              <div className="section-text">{rowContent.statusTitle}</div>
              <div className="section-text section-status-text">
                {rowContent.statusText}
              </div>
            </div>
            <div className="section-footer">{resultButton}</div>
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
            <i
              className={`fa ${this.state.data.type === 'build'
                ? ' fa-desktop'
                : 'fa-th'}`}
            />{' '}
            {'\u00A0'}
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
