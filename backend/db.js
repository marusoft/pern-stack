const dotenv = require('dotenv');
const Pool = require('pg').Pool;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// const pool = new Pool({
//   user: 'postgres',
//   password: 'my-password',
//   host: 'localhost',
//   port: '5432',
//   database: 'my-database'
// });


module.exports = pool;