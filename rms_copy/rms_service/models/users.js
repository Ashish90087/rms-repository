var db = require('../dbconnection');


var users = 
{
  

    issueAndUpdateStock:function(data, callback) 
  {     
      console.log("Rohit");
    
    db.getConnection(function (err, connection) 
    {      
      if (err) throw err;
      connection.beginTransaction(function (err) 
      {
        if (err) {
          callback(err);
          throw err;
        }
        var query = "insert into ?? set ?";       
        connection.query(query, ['issued_details', data], function (error, result, fields) {
            if (err) {
                return connection.rollback(function () {
                  callback(err);
                  throw err;
                });
              }
          connection.query(`update stock_receive_mas set status_id=? where stock_id = '${data.stock_id}'`, [2], function (err, results) {
            if (err) {
              return connection.rollback(function () {
                callback(err);
                throw err;
              });
            }
            connection.commit(function (err) {
              if (err) {
                connection.rollback(function () {
                  callback(err);
                });
              }
              return callback(results)
            });
          });
        });
      });
    });
  },

  //////////////////////////////////////////////// 

}//last bracket


var returnedusers = {
  

  ReturnAndUpdateStock:function(data, callback) 
{     
    console.log("Rohit");
  
  db.getConnection(function (err, connection) 
  {      
    if (err) throw err;
    connection.beginTransaction(function (err) 
    {
      if (err) {
        callback(err);
        throw err;
      }
      var query = "insert into ?? set ?";       
      connection.query(query, ['returned_stock_details', data], function (error, result, fields) {
          if (err) {
              return connection.rollback(function () {
                callback(err);
                throw err;
              });
            }
        connection.query(`update stock_receive_mas set status_id=? where stock_id = '${data.stock_id}'`, [5], function (err, results) {
          if (err) {
            return connection.rollback(function () {
              callback(err);
              throw err;
            });
          }
          connection.commit(function (err) {
            if (err) {
              connection.rollback(function () {
                callback(err);
              });
            }
            return callback(results)
          });
        });
      });
    });
  });
},

//////////////////////////////////////////////// 

}



module.exports = users;
module.exports = returnedusers;










