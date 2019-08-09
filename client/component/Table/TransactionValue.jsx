import React from 'react';
import numeral from 'numeral';
import Icon from '../Icon';

/**
 * Adds ability to format a transaction value
 * @todo move to FormattedValues folder
 */
const TransactionValue = (tx, blockValue) => {
  const formattedBlockValue = (numeral(blockValue).format(config.coinDetails.coinNumberFormat));

  const getTransactionTitle = (tx) => {
    let blockRewardTitle = 'Block Reward for PoS & Masternode';

    /**
     * Check that tx has blockRewardDetails for backwards compatability
     */
    if (tx.blockRewardDetails) {
      const inputAgeHours = (tx.blockRewardDetails.stake.input.age / 60 / 60).toFixed(2);
      const inputConfirmations = tx.blockRewardDetails.stake.input.confirmations;

      blockRewardTitle=`${blockRewardTitle} (Input: ${inputAgeHours} hours, ${inputConfirmations} confirmations)`
    }
    return blockRewardTitle;
  };

  if (tx.isReward) {
    return formattedBlockValue;
  }

  return formattedBlockValue;
}

export default TransactionValue;
