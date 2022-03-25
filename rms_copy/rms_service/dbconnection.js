var mysql = require('mysql');
var connection = mysql.createPool({
  // host: '10.132.2.172',
  // user: 'root',
  // password: 'nic',
  // database: 'rms'
  host: 'localhost',
  user: 'root',
  password: 'ashish123',
  database: 'rms'

});
module.exports = connection;
