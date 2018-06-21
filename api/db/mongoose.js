var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const options = {
  useMongoClient: true,
  //promiseLibrary: bluebird,
  // autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

// mongoose.connect(uri, options, function(error) {
//   // Check error in initial connection. There is no 2nd param to the callback.
// });
//
// // Or using promises
// mongoose.connect(uri, options).then(
//   () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
//   err => { /** handle initial connection error */ }
// );
mongoose.connect(process.env.MONGODB_URI, options);


module.exports = {mongoose};
