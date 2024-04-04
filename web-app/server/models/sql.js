import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;
console.log('PG_URI in model is ', PG_URI);

const pool = new Pool({
  connectionString: PG_URI,
  max: 20,
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000,
});

const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

export default db;
