//mySql connection 가져오는 코드.
const mysql = require('mysql');
const connection = mysql.createPool({
  host: '52.78.162.166',
  port: 53273,
  user: 'test',
  password: '1234',
  database: 'osam',
});

module.exports = connection;
