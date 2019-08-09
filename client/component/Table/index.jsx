
import Component from 'core/Component';
import PropTypes from 'prop-types';
import React from 'react';

import { Table } from 'reactstrap';

export default class TableWrapper extends Component {
  static defaultProps = {
    cols: [],
    header: [],
    data: [],
    hasDivider: true,
  };

  static propTypes = {
    cols: PropTypes.array,
    header: PropTypes.array,
    data: PropTypes.array,
    max: PropTypes.number,
    hasDivider: PropTypes.bool,
  };

  componentDidMount() {
  };

  componentWillUnmount() {
  };

  getHeader() {
    const cells = this.props.header.map((col, idx) => {
      if (typeof col === 'object') {
        col = col.title;
      }

      return (
        <th key={idx}>{col}</th>
      )
    });

    return (
      <thead>
        <tr>
          {cells}
        </tr>
      </thead>
    );
  }

  getBody() {
    const { data } = this.props;
    const keys = this.getKeys();

    const rows = data.map((row, idx) => {
      const cells = keys.map((col, i) => {
        return (
          <td key={ i }>{ row[col] }</td>
        )
      });

      return (
        <tr key={ idx }>
          { cells }
        </tr>
      )
    })

    return (
      <tbody>
        { rows }
      </tbody>
    );
  }

  getKeys() {
    const { header } = this.props;

    const keys = header.map(col => {
      return (typeof col === 'object') ? col.key : col;
    })

    return keys;
  }

  render() {
    const { props } = this;

    if (!props.data.length) {
      return false;
    }

    return (
      <div className="table-wrapper">
        <div className="table-wrapper__shadow-margin">
          <Table className={ `${ this.props.hasDivider ? 'table--has-divider' : '' } ${ this.props.className || 'animated fadeIn' }` }>
            { this.getHeader() }
            { this.getBody() }
          </Table>
        </div>
      </div>
    );
  };
}
