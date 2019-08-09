
const config_private = require('../config_private');
const promise = require('bluebird');

/**
 * Return the DSN string for the mongodb connection.
 */
const getDSN = () => {
  return `mongodb://${ config_private.db.host }:${ config_private.db.port }/${ config_private.db.name }`;
};

/**
 * Return the options for the mongodb connection.
 */
const getOptions = () => {
  return {
    auth: { authdb: config_private.db.name },
    native_parser: true,
    pass: config_private.db.pass,
    promiseLibrary: promise,
    user: config_private.db.user
  };
};

module.exports =  {
  getDSN,
  getOptions
};
