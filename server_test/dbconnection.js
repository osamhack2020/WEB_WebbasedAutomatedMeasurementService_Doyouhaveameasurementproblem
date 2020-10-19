//mySql connection 가져오는 코드.
const mysql = require('mysql');
const connection = mysql.createPool({
  host: '13.124.240.211',
  port: 51809,
  user: 'test',
  password: '1234',
  database: 'osam',
});

module.exports = connection;
