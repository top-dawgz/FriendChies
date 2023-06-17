const { Pool } = require('pg');

const PG_URI = 'postgres://zrfhtgja:fx7gRGfYALLGMz2PN-2n8yi9I4npIT4b@rajje.db.elephantsql.com/zrfhtgja';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
