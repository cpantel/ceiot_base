const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Role = db.role;
var bcrypt = require("bcryptjs");

var findTheOne = (id, res, status) => {
  User.findByPk(
    id, 
    { attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      },
      include: [
        {
          model: Role,
          attributes: ['id','name'],
          through: {
            attributes: []
          }
        }
      ]
    }
  ).then(user => {
    if (null == user) {
      return res.status(403).send({
        status: 403,
        message: "User not found",
        result: {}
      });
    } else {
      return res.status(status).send(
        { 
          status: status,
          message: "login ok",
          result: user  
        }
      )
    }
  }).catch(err => {
    return res.status(500).send({
          status: 500,
          message: "User not found",
          result: {}
    });
  }
)};

exports.findOne = (req, res) => {
  return findTheOne(req.params.userId, res, 200);
};


exports.findAll = (req, res) => {
  User.findAll({
    attributes: ['id', 'username','email'],
    include: [{
      model: Role,
      attributes: ['id','name'],
      through: {
        attributes: []
      }
    }]
  }).then(users => {
    res.status(200).send({
      status:200,
      message: "users list",
      result: users
    });
  })}

exports.delete = (req, res) => {
  console.log ("DELETE called");
  User.destroy(
    {where: {id: req.params.userId}}
  ).then( num=> {
     if (1 == num) {
        res.status(200).send({
          status: 200,
          message: "User deleted",
          result: {}
        })
     } else { 
      res.status(404).send({
          status: 404,
          message: "User not found",
          result: {}
      })
     }}
  );
}

exports.create = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)   // TODO: move to middleware
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            return findTheOne(user.id,res,201);
            res.status(201).send({ 
              status: 201,
              message: "User created",
              result: user
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          return findTheOne(user.id,res,201);
          res.status(201).send({ 
              status: 201,
              message: "User created",
              result: user
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ 
        status: 500,
        message: err.message,
        result: {}
      });
    });
};


// Update a User by the id in the request
exports.update = (req, res) => {
  
};

