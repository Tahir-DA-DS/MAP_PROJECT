const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
  
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, process.env.SECRET, (err, authData) => {
        if (err) {
          res.status(403).json({ message: 'Token is invalid or expired' });
        } else {
          req.authData = authData;
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'Authorization token is missing' });
    }
  };

module.exports = verifyToken