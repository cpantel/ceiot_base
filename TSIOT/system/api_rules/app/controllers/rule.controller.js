const db = require("../models");
const Op = db.Sequelize.Op;
const Rule = db.rule;
const Action = db.action;

var findTheOne = (id,res,status) => {
  Rule.findByPk(id,{
    attributes: {
        exclude: ['createdAt', 'updatedAt', 'actionId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    }]
  }
  ).then(rule => {
    if (null == rule) {
      res.status(403).send({
        status:403,
        message: "Rule not found",
        result: {}
      }); 
    } else {
      res.status(status).send({
        status:status,
        message: "Rule",
        result: rule
      });
    }
  }).catch(err => {
    return res.status(403).send({
      status:403,
      message: "No token provided",
      result: {}
    });
  }
 )
}

exports.findOne = (req, res) => {
  return findTheOne(req.params.ruleId,res,200);
};

exports.findAll = (req, res) => {
  Rule.findAll({
    attributes: {
        exclude: ['createdAt', 'updatedAt', 'actionId']
      },
    include: [{
      model: Action,
      attributes: ['id','name'],
    }]
  }).then(rules => {
    res.status(200).send({
      status:200,
      message: "Rule list",
      result: rules
    });
  })}

exports.delete = (req, res) => {
  console.log ("DELETE called");
  Rule.destroy(
    {where: {id: req.params.ruleId}}
  ).then( num=> {
    if (1 == num) {
      res.status(201).send({
        status:201,
        message: "Rule deleted",
        result: {}
      })
    } else { 
      res.status(401).send({
        status:401,
        message: "Rule not found",
        result: {}
      })
    }}
  );
}


exports.create = (req, res) => {

  Rule.create(req.body).then(rule => {
    return findTheOne(rule.id,res,201);
  }).catch(err => {
    res.status(500).send({
      status:500,
      message: err.message,
      result: {}
    });
  });
};

exports.update = (req, res) => {
  Rule.update(
   req.body, 
   { where: { id: req.body.id },
    include: [{
      model: Action
    }]
   }
  ).then(rule => {
    if (null == rule) {
      res.status(403).send({
        status:403,
        message: "Rule not found",
        result: {}
      }); 
    } else {
     return findTheOne(req.body.id,res,201);
    }
  }).catch(err => {
    return res.status(500).send({
      status:500,
      message: "Server error 02",
      result: {}
    });
  })  
};
