import Component from '../../core/Component';
import { dateFormat } from '../../../lib/date';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon'

import Table from '../Table';
import PosProfitabilityScore from '../PosProfitabilityScore';

export default class CardRewards extends Component {
  static defaultProps = {
    rewards: []
  };

  static propTypes = {
    rewards: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      cols: [
        { key: 'blockHeight', title: 'Block #' },
        { key: 'posAddress', title: 'PoS Address' },
        { key: 'posReward', title: 'PoS Reward' },
        { key: 'computedProfitabilityScore', title: 'PoS Score' },
        { key: 'masternodeAddress', title: 'MN Address' },
        { key: 'masternodeReward', title: 'MN Reward' },
        { key: 'age', title: 'Age' },
        { key: 'date', title: 'Created' },
      ]
    };
  };

  getRewardLink(reward) {

    /**
     * By default go to the tx that was stake's input
     */
    let txId = reward.stake.input.txId;

    /**
     * In update, we now can go directly to reward tx
     */
    if (reward.txId) {
      txId = reward.txId;
    }

    return `/tx/${txId}`;
  }

  getTableData() {
    return this.props.rewards.map(reward => {
      const date = moment(reward.date).utc();
      const diffSeconds = moment().utc().diff(date, 'seconds');

      return ({
        ...reward,
        blockHeight: (
          <Link to={`/block/${reward.blockHeight}`}>
            {reward.blockHeight}
          </Link>
        ),
        posAddress: (
          <Link to={`/address/${reward.stake.address}`}>
            {`${reward.stake.address.substr(0, 10)}...`}
          </Link>
        ),
        posReward: (
          <Link to={this.getRewardLink(reward)}>
            <span className="badge badge-transaction-amount">
              {numeral(reward.stake.reward).format(config.coinDetails.coinNumberFormat)}
            </span>
          </Link>
        ),
        computedProfitabilityScore: (
          <Link to={this.getRewardLink(reward)}>
            <PosProfitabilityScore reward={reward} />
          </Link>
        ),
        masternodeAddress: (
          <Link to={`/address/${reward.masternode.address}`}>
             {`${reward.masternode.address.substr(0, 10)}...`}
          </Link>
        ),
        masternodeReward: (
          <Link to={this.getRewardLink(reward)}>
            <span className="badge badge-transaction-amount">
              {numeral(reward.masternode.reward).format(config.coinDetails.coinNumberFormat)}
            </span>
          </Link>
        ),
        age: (
          <Link to={this.getRewardLink(reward)}>
            {diffSeconds < 60 ? `${diffSeconds} seconds` : date.fromNow(true)}
          </Link>
        ),
        date: (
          <Link to={this.getRewardLink(reward)} className="text-nowrap">
            {dateFormat(reward.date)}
          </Link>
        ),
      });
    })
  }

  render() {
    return (
      <Table
        header={this.state.cols}
        data={this.getTableData()} />
    );
  };
}
