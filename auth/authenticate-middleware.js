/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

const { jwtSecret } =require('../config/secret.js');


module.exports = (req, res, next) => {
  const { authorization } = req.headers
  
  if(authorization){
    jwt.verify(authorization, jwtSecret, ((err, decodedToken) => {
      if(err) {
        console.log(err)
        res.status(401).json({ message: "invalid Credentials"})
      } else { 
        req.decodedToken = decodedToken
        next();
      }
    }))
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
