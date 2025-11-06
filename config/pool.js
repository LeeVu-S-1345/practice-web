const { Pool } = require('pg'); // PostgreSQL client
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.on('connect', async (client) => {
  await client.query('SET search_path TO product;');
});

module.exports = pool;