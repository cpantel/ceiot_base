const { authJwt, checks } = require("../middleware");
const controller = require("../controllers/rule.controller");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(function(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body).replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    next();
  });

  app.delete(
    "/api/rules/:ruleId",
    [
      authJwt.verifyToken
    ],
    controller.delete
  );

  app.get(
    "/api/rules/:ruleId",
    [
      authJwt.verifyToken,
    ],
    controller.findOne
  );

  app.get(
    "/api/rules",
    [
      authJwt.verifyToken,
    ],
    controller.findAll
  );


  app.post(
    "/api/rules",
    [
      authJwt.verifyToken
    ],
    controller.create
  );

  app.patch(
    "/api/rules/:ruleId",
    [
      authJwt.verifyToken,
      checks.checkRuleId

    ],
    controller.update
  );


};
