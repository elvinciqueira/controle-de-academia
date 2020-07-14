const { Pool } = require('pg');

module.exports = new Pool({
  user: 'postgres',
  password: 'docker',
  host: '192.168.99.100',
  port: 5432,
  database: 'gymmanager',
});
