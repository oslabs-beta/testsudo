// import pg from 'pg';
// const { Pool } = pg
// import 'dotenv/config';
// import dotenv from 'dotenv';
// dotenv.config();

// const PG_URI = process.env.PG_URI;
// console.log('PG_URI in model is ', PG_URI);

// const pool = new Pool({
//   connectionString: PG_URI,
// });

// const db = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };

// export default db;


const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();

const PG_URI = process.env.PG_URI;
console.log('PG_URI in model is ', PG_URI);

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

module.exports = db;
