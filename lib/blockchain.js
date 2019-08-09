// Diaz blockchain and reward parameters.
const params = {
  LAST_POW_BLOCK: 1500
};

const avgBlockTime = 60; // 1 minutes (60 seconds)
const blocksPerDay = (24 * 60 * 60) / avgBlockTime; // 1440
const blocksPerWeek = blocksPerDay * 7; // 10080
const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 43830
const blocksPerYear = blocksPerDay * 365.25; // 525960
const mncoins = 15000.0;

const getMNBlocksPerDay = (mns) => {
  return blocksPerDay / mns;
};

const getMNBlocksPerWeek = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
  return getMNBlocksPerDay(mns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0) => {
  const blockValue = getSubsidy(nHeight);
  let ret = 0.0;
  let mNodeCoins = nMasternodeCount * 15000;

  if (mNodeCoins === 0) {
    ret = 0;
  } else if (nHeight > 205000) {
    ret = blockValue * 0.7;
  } else if (nHeight > 1) {
    ret = blockValue * 0.6;
  }

  return ret;
};

const getSubsidy = (nHeight = 1) => {
  let nSubsidy = 0.0;

  // Block rewards.
  if (nHeight > 430000) {
      nSubsidy = 5;
  } else if (nHeight > 340000) {
      nSubsidy = 10;
  } else if (nHeight > 250000) {
      nSubsidy = 13.5;
  } else if (nHeight > 205000) {
      nSubsidy = 25;
  } else if (nHeight > 160000) {
      nSubsidy = 50;
  } else if (nHeight > 100000) {
      nSubsidy = 60;
  } else if (nHeight > 42000) {
      nSubsidy = 70;
  } else if (nHeight > 22000) {
      nSubsidy = 80;
  } else if (nHeight > 12000) {
      nSubsidy = 90;
  } else if (nHeight > params.LAST_POW_BLOCK()) {
      nSubsidy = 100;
  } else if (nHeight > 1) {
      nSubsidy = 1;
  } else if (nHeight === 1) {
      nSubsidy = 220000;
  }

  return nSubsidy;
};

const getROI = (subsidy, mns) => {
  return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
};

const isAddress = (s) => {
  return typeof (s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
  return !isNaN(s) || (typeof (s) === 'string');
};

const isPoS = (b) => {
  return !!b && b.height > params.LAST_POW_BLOCK; // > 1500
};

const isTX = (s) => {
  return typeof (s) === 'string' && s.length === 64;
};

/**
 * How we identify if a raw transaction is Proof Of Stake & Masternode reward
 * @param {String} rpctx The transaction hash string.
 */
const isRewardRawTransaction = (rpctx) => {
  return rpctx.vin.length == 1 &&
    rpctx.vout.length == 3 &&

    // First vout is always in this format
    rpctx.vout[0].value == 0.0 &&
    rpctx.vout[0].n == 0 &&
    rpctx.vout[0].scriptPubKey &&
    rpctx.vout[0].scriptPubKey.type == "nonstandard";
}

module.exports = {
  avgBlockTime,
  blocksPerDay,
  blocksPerMonth,
  blocksPerWeek,
  blocksPerYear,
  mncoins,
  params,
  getMNBlocksPerDay,
  getMNBlocksPerMonth,
  getMNBlocksPerWeek,
  getMNBlocksPerYear,
  getMNSubsidy,
  getSubsidy,
  getROI,
  isAddress,
  isBlock,
  isPoS,
  isTX,
  isRewardRawTransaction
};
