exports.initial = (user,role,config,bcrypt) => {
  var adminRole;
  var userRole;
  role.create({
    name: "admin"
  }).then(role => adminRole = role);

  role.create({
    name: "user"
  }).then(role => userRole = role);

  user.create({
    username: config.ADMIN_USERNAME,
    email: "admin@samauec.org",
    password: bcrypt.hashSync(config.ADMIN_PASSWORD, 8)
  }).then(user => {
          user.setRoles([adminRole,userRole])
  });

  user.create({
    username: "user1",
    email: "user1@example.org",
    password: bcrypt.hashSync("user1", 8)
  }).then(user => {
          user.setRoles([userRole])
  });

  user.create({
    username: "user2",
    email: "user2@example.org",
    password: bcrypt.hashSync("user2", 8)
  }).then(user => {
          user.setRoles([userRole])
  });
}
