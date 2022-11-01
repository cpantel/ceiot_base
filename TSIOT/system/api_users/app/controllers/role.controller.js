const db = require("../models");
const Op = db.Sequelize.Op;
const Role = db.role;

var findTheOne = (id, res, status) => {
  Role.findByPk(
    id, 
    { attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  ).then(role => {
    if (null == role) {
      return res.status(403).send({
        status: 403,
        message: "Role not found",
        result: {}
      });
    } else {
      return res.status(status).send(
        { 
          status: status,
          message: "role ok",
          result: role
        }
      )
    }
  }).catch(err => {
    return res.status(500).send({
          status: 500,
          message: "Role not found",
          result: {}
    });
  }
)};

exports.findOne = (req, res) => {
  return findTheOne(req.params.roleId, res, 200);
};


exports.findAll = (req, res) => {
  Role.findAll({
    attributes: ['id', 'name']
  }).then(roles => {
    res.status(200).send({
      status:200,
      message: "roles list",
      result: roles
    });
  })}

exports.delete = (req, res) => {
  Role.destroy(
    {where: {id: req.params.roleId}}
  ).then( num=> {
     if (1 == num) {
        res.status(200).send({
          status: 200,
          message: "Role deleted",
          result: {}
        })
     } else { 
      res.status(404).send({
          status: 404,
          message: "Role not found",
          result: {}
      })
     }}
  );
}

exports.create = (req, res) => {
      Role.create(req.body).then(rule => {
    return findTheOne(rule.id,res,201);
  }).catch(err => {
    res.status(500).send({
      status:500,
      message: err.message,
      result: {}
    });
  });
};


// Update a User by the id in the request
exports.update = (req, res) => {
  
};

