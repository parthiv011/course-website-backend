const jwt = require('jsonwebtoken');
const { secret } = require('../config');

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization; // [bearer jwtToken]
  const splitter = token.split(' ');
  const jwtToken = splitter[1];

  try {
    const decodedValue = jwt.verify(jwtToken, secret);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: 'You are not authenticated as Admin!',
      });
    }
  } catch (e) {
    res.json({
      msg: 'Incorrect inputs!',
      error: e,
    });
  }
}

module.exports = adminMiddleware;
