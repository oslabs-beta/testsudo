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

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

module.exports = db;
