var db = require('../dbconnection');
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
            console.log(data);
            var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
                 
          connection.query( "insert into stock_transaction_details set ? ",{stock_id:data.stock_id,transaction_date:CURRENT_TIMESTAMP,status:'5'}, function (error, result, fields) {
            if (err) {
                return connection.rollback(function () {
                  callback(err);
                  throw err;
                  console.log(result.stock_id);
                });
              }
              console.log(data.stock_id);
            connection.commit(function (err) {
              if (err) {
                connection.rollback(function () {
                  callback(err);
                });
              }
              return callback(result)
            });
          });
          });
        });
      });
    });
  },
  
  //////////////////////////////////////////////// 
  
  }
  
  
  module.exports = returnedusers;