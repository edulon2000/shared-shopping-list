const { Pool } = require('pg');

const pool = new Pool({
  user: 'shopping_list_user',
  host: 'localhost',
  database: 'shopping_list_db',
  password: '12345',
  port: 5432,
});

module.exports = pool;
