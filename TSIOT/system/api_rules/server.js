const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var whitelist = ['http://www.smauec.net', 'http://localhost:4200'];


var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Rule = db.rule;
const Action = db.action;

if ("prod" == process.env.NODE_ENV) {
  db.sequelize.sync();
} else {
// force: true will drop the table if it already exists
   db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync Database with { force: true }');
   const fixture = require("./test/fixtures/initial.js");
   fixture.initial(Action, Rule);
 });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to smauec rules application." });
});

// routes
require('./app/routes/rule.routes')(app);
require('./app/routes/action.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Rule Server is running on port ${PORT}.`);
});



