const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET; 

loginController = (req, res) => {
  const validUsername = process.env.validUsername;
  const validPassword = process.env.validPassword;

  const { username, password } = req.body;

  if (username === validUsername && password === validPassword) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
}


module.exports = {loginController}