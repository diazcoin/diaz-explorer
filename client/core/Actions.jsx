import fetchWorker from '../../lib/fetch.worker';
import promise from 'bluebird';
import {
  COIN,
  COINS,
  ERROR,
  TXS,
  WATCH_ADD,
  WATCH_REMOVE
} from '../constants';

const promises = new Map();
const worker = new fetchWorker();
const api_url = config.api.host + ':' + config.api.portWorker + config.api.prefix;

worker.onerror = (err) => {
  console.log(err);
  return err;
};

worker.onmessage = (ev) => {
  const p = promises.get(ev.data.type);
  if (!p) {
    return false;
  }

  if (ev.data.error) {
    p.reject(ev.data.error);
    promises.delete(ev.data.type);
    return false;
  }

  p.resolve(ev.data.data);
  return true;
};

const getFromWorker = (type, api, resolve, reject, query = null) => {
  promises.set(type, { resolve, reject });
  worker.postMessage({ query, type, api });
  return true;
};

export const getAddress = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('address', api_url, resolve, reject, query);
  });
};

export const getBlock = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('block', api_url, resolve, reject, query);
  });
};

export const getCoinHistory = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'coins',
      api_url,
      (payload) => {
        if (payload && payload.length) {
          dispatch({ payload: payload[0], type: COIN });
        }
        dispatch({ payload, type: COINS });
        resolve(payload);
      },
      (payload) => {
        dispatch({ payload, type: ERROR });
        reject(payload);
      },
      query
    );
  });
};

export const getCoinsWeek = () => {
  return new promise((resolve, reject) => {
    return getFromWorker('coins-week', api_url, resolve, reject);
  });
};

export const getIsBlock = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('is-block', api_url, resolve, reject, query);
  });
};

export const getMNs = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('mns', api_url, resolve, reject, query); /* Resolves to getMNs in fetch.worker.js */
  });
};

export const getPPs = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('pps', api_url, resolve, reject, query);
  });
};

export const getPeers = () => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'peers',
      api_url,
      (peers) => {
        resolve(peers.map((peer) => {
          const parts = peer.ip.split('.');
          parts[3] = 'XXX';
          peer.ip = parts.join('.');
          return peer;
        }));
      },
      reject
    );
  });
};

export const getSupply = (dispatch) => {
  return new promise((resolve, reject) => {
    return getFromWorker('supply', api_url, resolve, reject);
  });
};

export const getTop100 = () => {
  return new promise((resolve, reject) => {
    return getFromWorker('top-100', api_url, resolve, reject);
  });
};

export const getTX = (query) => {
  return new promise((resolve, reject) => {
    return getFromWorker('tx', api_url, resolve, reject, query);
  });
};

export const getTXLatest = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'txs-latest',
      api_url,
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: TXS });
        }
        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};

export const getTXs = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'txs',
      api_url,
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: TXS });
        }
        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};

export const getRewards = (dispatch, query) => {
  return new promise((resolve, reject) => {
    return getFromWorker(
      'rewards',
      api_url,
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: REWARDS });
        }
        resolve(payload);
      },
      (payload) => {
        if (dispatch) {
          dispatch({ payload, type: ERROR });
        }
        reject(payload);
      },
      query
    );
  });
};


export const getTXsWeek = () => {
  return new promise((resolve, reject) => {
    return getFromWorker('txs-week', api_url, resolve, reject);
  });
};

/**
 * This is currently the only action that updates anything in the store - Look at Reducers.jsx, txs()
 */
export const setTXs = (dispatch, txs) => {
  dispatch({ payload: txs, type: TXS });
};

/**
 * @todo Remove, don't think this is used
 */
export const setWatch = (dispatch, term) => {
  dispatch({ payload: term, type: WATCH_ADD });
};

/**
 * @todo Remove, don't think this is used
 */
export const removeWatch = (dispatch, term) => {
  dispatch({ payload: term, type: WATCH_REMOVE });
};

export default {
  getAddress,
  getBlock,
  getCoinHistory,
  getCoinsWeek,
  getIsBlock,
  getMNs,
  getPPs,
  getPeers,
  getSupply,
  getTop100,
  getTX,
  getTXLatest,
  getTXs,
  getTXsWeek,
  setTXs,
  setWatch,
  removeWatch,
  getRewards
};
