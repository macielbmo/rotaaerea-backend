const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_URL,
  port: 5432,
  user: process.env.DB_USR,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
