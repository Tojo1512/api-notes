const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: true,
  },
});

pool.on("error", (err) => {
  console.error("Erreur inattendue du pool de connexion", err);
});

module.exports = pool;
