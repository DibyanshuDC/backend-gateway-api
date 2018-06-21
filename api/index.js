require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT;

const app = express();
const routes = require('./routes/index');

// Enable CORS from client-side
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});


app.use(bodyParser.json());


app.use('/api/v1.0/', routes);
//app.use('/public/', routes2);

app.get('/', (req, res) =>{
  res.send('Working');
});

// Handle 404 error.
// The last middleware.
app.use("*",function(req,res){
  //To generalise and hide the fact that it was not found(404)
  res.status(500).send();
});


app.listen(port, () => {
  console.log(`Started up at port ${port} open http://127.0.0.1:${port}/`);
});

//For Testing purpose
module.exports = {app, routes};


//TODO use express-session
