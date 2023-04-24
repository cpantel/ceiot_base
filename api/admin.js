const fs = require('fs');

const addAdminEndpoint = function (app, render){
  app.get('/admin/:command', function(req,res) {
    var msg="done";
    switch (req.params.command) {
       case "clear":
         if (req.query.db == "mongo") {
           msg = "clearing mongo";
           /* UNIMPLEMENTED */
	 } else if (req.query.db == "psql") {
           msg = "clearing psql";
           /* UNIMPLEMENTED */
	 } else {
           msg = "unknown db " + req.query.db;
         }
       break;
       case "save":
         if (req.query.db == "mongo") {
           msg = "saving mongo to " + req.query.file;
           /* UNIMPLEMENTED */
	 } else if (req.query.db == "psql") {
           msg = "saving psql " + req.query.file;
           /* UNIMPLEMENTED */
	 } else {
           msg = "unknown db " + req.query.db;
         }
       break;
       case "show":
         msg = fs.readFileSync("../fixtures/" + req.query.file);
       break;
 
       break;
       default:
         msg="Command: " + req.params.command + " not implemented"
    }
    var template = "<html>"+
                     "<head><title>Admin</title></head>" +
                     "<body>" +
                        "{{ msg }}"+
                     "</body>" +
                "</html>";
    res.send(render(template,{msg:msg}));
})};

module.exports = addAdminEndpoint;
