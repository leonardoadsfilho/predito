const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'user_predito',
  host: 'localhost',
  database: 'sensor',
  password: 'user',
  port: 5432,
}); 

module.exports = pool;
