
import Component from '../../core/Component';
import { dateFormat } from '../../../lib/date';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import Table from '../Table';
import TransactionValue from '../../component/Table/TransactionValue';

export default class CardTXs extends Component {
  static defaultProps = {
    txs: []
  };

  static propTypes = {
    txs: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      cols: [
        { key: 'blockHeight', title: 'Height' },
        { key: 'txId', title: 'Transaction Hash' },
        { key: 'vout', title: (
          <span className="badge-right">Value</span>
        )},
        { key: 'age', title: 'Age' },
        { key: 'createdAt', title: 'Created' },
      ]
    };
  };

  render() {
    return (
      <Table
        header={this.state.cols}
        data={this.props.txs.map(tx => {
          const createdAt = moment(tx.createdAt).utc();
          const diffSeconds = moment().utc().diff(createdAt, 'seconds');
          let blockValue = 0.0;
          if (tx.vout && tx.vout.length) {
            tx.vout.forEach(vout => blockValue += vout.value);
          }

          return ({
            ...tx,
            blockHeight: (
              <Link to={`/block/${tx.blockHeight}`}>
                {tx.blockHeight}
              </Link>
            ),
            txId: (
              <Link to={`/tx/${tx.txId}`}>
                {tx.txId}
              </Link>
            ),
            vout: (
              <Link to={`/tx/${tx.txId}`}>
                <span className="badge badge-transaction-amount badge-right">
                  {TransactionValue(tx, blockValue)}
                </span>
              </Link>
            ),
            age: (
              <Link to={`/tx/${tx.txId}`}>
                {diffSeconds < 60 ? `${diffSeconds} seconds` : createdAt.fromNow(true)}
              </Link>
            ),
            createdAt: (
              <Link to={`/tx/${tx.txId}`} className="text-nowrap">
                {dateFormat(tx.createdAt)}
              </Link>
            ),
          });
        })} />
    );
  };
}
