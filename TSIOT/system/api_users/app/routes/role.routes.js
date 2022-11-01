const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.delete(
    "/api/roles/:roleId",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    controller.delete
  );

  app.get(
    "/api/roles/:roleId",
    [
      authJwt.verifyToken,
    ],
    controller.findOne
  );

  app.get(
    "/api/roles",
    [
      authJwt.verifyToken,
    ],
    controller.findAll
  );


  app.post(
    "/api/roles",
    [
      authJwt.verifyToken,
      authJwt.isAdmin

    ],
    controller.create
  );

};
