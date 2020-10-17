const mysql = require('mysql');
const connection = mysql.createPool({
  host: '54.180.195.102',
  port: 55308,
  user: 'test',
  password: '1234',
  database: 'osam',
});

module.exports = connection;
