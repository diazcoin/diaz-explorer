/**
 * Global private configuration object.
 */
const config_private = {
  db: {
    'host': 'localhost',
    'port': '27017',
    'name': 'diazcoindb',
    'user': 'diazcoinuser',
    'pass': 'diazcoinpassword'
  },
  rpc: {
    'host': 'localhost',
    'port': '28282',
    'user': 'rpcuser',
    'pass': 'rpcpassword',

    /**
     * Timeout 8 seconds.
     */
    'timeout': 8000,
  }
};

module.exports = config_private;
