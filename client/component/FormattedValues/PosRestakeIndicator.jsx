import React from 'react';
import numeral from 'numeral';
import Icon from '../Icon';

/**
 * Adds ability to format a transaction value
 * @todo move to FormattedValues folder
 */
const PosRestakeIndicator = ({ reward, includeShortName = false }) => {

  const getTitle = (reward) => {
    if (!reward.stake.input.isRestake) {
      return null;
    }
    return "Restake (Stake of Previously Staked Output)";
  }

  const formatAmount = (amountToFormat) => {
    const amountFormatted = (numeral(amountToFormat).format(config.coinDetails.coinNumberFormat)); /* @todo We really need to move all of these formattings into a single component */

    if (includeShortName) {
      return `${amountFormatted} ${config.coinDetails.shortName}`;
    }

    return amountFormatted;
  }

  return (
    <span title={getTitle(reward)}>
      {formatAmount(reward.stake.input.value)}
    </span>
  );
}

export default PosRestakeIndicator;
