const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.delete(
    "/api/users/:userId",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    controller.delete
  );

  app.get(
    "/api/users/:userId",
    [
      authJwt.verifyToken,
    ],
    controller.findOne
  );

  app.get(
    "/api/users",
    [
      authJwt.verifyToken,
    ],
    controller.findAll
  );


  app.post(
    "/api/users",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,

    ],
    controller.create
  );

};
