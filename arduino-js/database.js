const { Client } = require("pg");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const client = new Client(dbConfig);

// console.log(client.password);

module.exports = client;
