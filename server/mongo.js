
const config_private = require('../config_private');
const db = require('../lib/db');
const mongoose = require('mongoose');

/* Validate Config */
if (!config_private.db.user || !config_private.db.pass) {
  console.log("Invalid user and/or password. User:", config_private.db.user, "Pass:", config_private.db.pass);
  process.exit(1);
}

/* Database */
// Connect to the database.
mongoose.connect(db.getDSN(), db.getOptions());

/* Add User */
// Create the database user.
mongoose.connection.db.addUser(config_private.db.user, config_private.db.pass);
