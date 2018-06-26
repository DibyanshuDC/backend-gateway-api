const oracledb = require('oracledb');


// Get a non-pooled connection
oracledb.getConnection(
    {
      user          : process.env.ORACLEDB_USER,
      password      : process.env.ORACLEDB_PASSWORD,
      connectString : process.env.connectString
    },
    function(err, connection) {
      if (err) {
        console.error(err);
        return;
      }
        connection.execute( `select trade_date,type,coinname,coin_value,coins_vol,txn_fee,total,status,market from CCY_TRADE_HISTORY where USR_KEY = 3017 and rownum <= 10 order by trade_date desc`,  
        [],  
        function(err, result) {  
             if (err) {  
                  console.error(err.message);  
                  doRelease(connection);  
                  return;  
             }  
             console.log(result.metaData);  
             console.log(result.rows);  
             doRelease(connection);  
        });  
   });  
     
   function doRelease(connection) {  
        connection.release(  
             function(err) {  
                  if (err) {console.error(err.message);}  
             }  
        );  
   };  







     


module.exports = {oracledb};