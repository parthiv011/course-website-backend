const jwt = require('jsonwebtoken');
const { secret } = require('../config');


function instructorMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const splitter = token.split(' ');
  const jwtToken = splitter[1];

  try {
    const decodedValue = jwt.verify(jwtToken, secret);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: 'You are not authenticated as Instructor!',
      });
    }
  } catch (e) {
    res.status(401).json({
      msg: 'Incorrect Token!',
      error: e,
    });
  }
}

module.exports = instructorMiddleware;
