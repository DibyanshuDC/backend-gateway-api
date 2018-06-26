const jwt = require('jsonwebtoken');

var claim = (req, res, next) => {
  var token = req.header('x-auth');
  var decoded;
	try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.access = decoded.access; 
    next();
    
	} catch (e) {
    res.status(401).send(e);
	}
};


module.exports = {claim};