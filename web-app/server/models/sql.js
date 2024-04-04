const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();

const PG_URI = process.env.PG_URI;
console.log('PG_URI in model is ', PG_URI);

const pool = new Pool({
  connectionString: PG_URI,
  max: 50, // 50 connections
  idleTimeoutMillis: 30000, // 30 seconds
});

// const RDS_HOSTNAME = process.env.RDS_HOSTNAME;
// const RDS_USERNAME = process.env.RDS_USERNAME;
// const RDS_PASSWORD = process.env.RDS_PASSWORD;
// const RDS_DB_NAME = process.env.RDS_DB_NAME;
// const RDS_PORT = process.env.RDS_PORT;

// console.log('RDS_HOSTNAME in model is ', RDS_HOSTNAME);

// const pool = new Pool({
//   host: RDS_HOSTNAME,
//   user: RDS_USERNAME,
//   password: RDS_PASSWORD,
//   port: RDS_PORT,
//   database: RDS_DB_NAME,
// });

// pool.connect(function(err) {
//   if (err) {
//     console.error('Error acquiring client', err.stack);
//     return;
//   }
//   console.log('Connected to database.');
// });

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

module.exports = db;
