const mysql = require('mysql');
const connection = mysql.createPool({
  host: '13.124.194.183',
  port: 54443,
  user: 'test',
  password: '1234',
  database: 'osam',
});

module.exports = connection;
