const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'employeeTrackR',
  user: 'postgres',
  password: 'mainpassword18!',
  port: 5432,
});

client.connect();

module.exports = client;
