// const { Pool } = require('pg');
import { Pool } from 'pg';
// require('dotenv').config();
import 'dotenv/config';

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

export const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
