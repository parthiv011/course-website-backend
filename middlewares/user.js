const jwt = require('jsonwebtoken');
const { secret } = require('../config');


function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const splitter = token.split(' ');
  const jwtToken = splitter[1];

  try {
    const decodedValue = jwt.verify(jwtToken, secret);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: 'You are not authenticated as User!',
      });
    }
  } catch (e) {
    res.json({
      msg: 'Incorrect inputs!',
      error: e,
    });
  }
}

module.exports = userMiddleware;
