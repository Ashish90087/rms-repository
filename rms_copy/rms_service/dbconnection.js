var mysql = require('mysql');
var connection = mysql.createPool({
  // host: '10.132.0.201',
  // user: 'root',
  // password: 'redhat',
  // database: 'hmis'
  host: 'localhost',
  user: 'root',
  password: 'ashish123',
  database: 'rms'

});
module.exports = connection;
