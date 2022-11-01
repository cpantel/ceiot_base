const { authJwt, checks } = require("../middleware");
const controller = require("../controllers/action.controller");

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
    "/api/actions/:actionId",
    [
      authJwt.verifyToken
    ],
    controller.delete
  );

  app.get(
    "/api/actions/:actionId",
    [
      authJwt.verifyToken,
    ],
    controller.findOne
  );

  app.get(
    "/api/actions",
    [
      authJwt.verifyToken,
    ],
    controller.findAll
  );


  app.post(
    "/api/actions",
    [
      authJwt.verifyToken
    ],
    controller.create
  );

  app.patch(
    "/api/actions/:actionId",
    [
      authJwt.verifyToken,
      checks.checkActionId

    ],
    controller.update
  );


};
