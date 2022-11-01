const db = require("../models");
const config = require("/var/run/secrets/api_auth_secret_" + process.env.NODE_ENV );
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signin = (req, res) => {
  console.log("auth for " + req.body.username);
  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).send({
          status: 401,
          message: "login fail 1",
          result: {}
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          status: 401,
          message: "login fail 2",
          result: {}
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 300
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          status: 200,
          message: "login ok",
          result: {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          }
        });
      });
    })
    .catch(err => {
      res.status(500).send({
          status: 500,
          message: err.message,
          result: {}
      });
    });
};
