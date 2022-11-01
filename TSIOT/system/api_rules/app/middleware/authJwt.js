const jwt = require("jsonwebtoken");
const config = require("/var/run/secrets/api_auth_secret_" + process.env.NODE_ENV );

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      status:403,
      message: "No token provided!",
      result: {}
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status:403,
        message: "Unauthorized",
        result: {}
      });
    }
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;
