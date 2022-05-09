var db = require('../dbconnection');


var newstocks = 
{
  

    receiveNewStock:function(data, callback) 
  {     
      console.log("Rohit Inserting issued details");
    
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
        connection.query(query, ['stock_receive_mas', data], function (error, result, fields) {
            if (err) {
                return connection.rollback(function () {
                  callback(err);
                  throw err;
                });
              }
              console.log("rohit inserting Stock_receive_mas")
         
            var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
            console.log("rohit inserting Stock_transaction_details")
            connection.query( "insert into stock_transaction_details set ? ",{stock_id:data.stock_id,transaction_date:CURRENT_TIMESTAMP,status:'1'}, function (error, result, fields) {
              if (err) {
                  return connection.rollback(function () {
                    callback(err);
                    throw err;
                    console.log(result.stock_id);
                  });
                }
            connection.commit(function (err) {
              if (err) {
                connection.rollback(function () {
                  callback(err);
                });
              }
              return callback(result);
            });
           
          });
        });
      });
    });
  },

  //////////////////////////////////////////////// 

}//last bracket




module.exports = newstocks;
// module.exports = returnedusers;
