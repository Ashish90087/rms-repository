var mysql = require('mysql');
var connection = mysql.createPool({
  // host: '10.132.2.172',
  // user: 'root',
  // password: 'nic',
  // database: 'rms'
  host: 'localhost',
  user: 'root',
  password: 'nic',
  database: 'rms'

});
module.exports = connection;
