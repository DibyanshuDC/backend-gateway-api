var isadmin = (req, res, next) => {
  if(req.access = "Contractor"){
      next()
  }
  else{
    res.status(401).send("Unauthorized");
  }
};


module.exports = {isadmin};