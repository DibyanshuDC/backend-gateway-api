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
        console.error(err.message);
        return;
      }
      connection.execute(
        // The statement to execute
        `select trade_date,type,coinname,coin_value,coins_vol,txn_fee,total,status,market from CCY_TRADE_HISTORY where USR_KEY = 3017 and rownum <= 10 order by trade_date desc`,
  
        // The "bind value" 180 for the bind variable ":id"
        [180],
  
        // execute() options argument.  Since the query only returns one
        // row, we can optimize memory usage by reducing the default
        // maxRows value.  For the complete list of other options see
        // the documentation.
        { maxRows: 1
          //, outFormat: oracledb.OBJECT  // query result format
          //, extendedMetaData: true      // get extra metadata
          //, fetchArraySize: 100         // internal buffer allocation size for tuning
        },
  
        // The callback function handles the SQL execution results
        function(err, result) {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
          }
          console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
          console.log(result.rows);     // [ [ 180, 'Construction' ] ]
          doRelease(connection);
        });
    });





// Note: connections should always be released when not needed
function doRelease(connection) {
    connection.close(
      function(err) {
        if (err) {
          console.error(err.message);
        }
      });
};


module.exports = oracledb;