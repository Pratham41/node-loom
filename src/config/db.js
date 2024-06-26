const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host : process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATABASE,
});

module.exports = pool;