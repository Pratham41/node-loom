const Pool = require("pg").Pool;

// process.env.PGHOST = 'openly-workable-longhorn-iad.a1.pgedge.io';
// process.env.PGUSER = 'admin';
// process.env.PGDATABASE = 'defaultdb';
// process.env.PGSSLMODE = 'require';
// process.env.PGPASSWORD = '****************';
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host : process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATABASE,
});

module.exports = pool;