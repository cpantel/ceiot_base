const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

const IP   = 'good';
const PORT = 8080;

app.get('/login', function (req,res) {
    res.send(	
     '<html>'+
     '<head><title>Good Login</title></head>' +
     '<body>' +
     '<form action="login" method="POST"> ' +
     '<label for="user">User:</label><br>' +
     '<input type="text" id="user" name="user" value="User"><br>' +
     '<label for="password">Password:</label><br>' +
     '<input type="text" id="password" name="password" value="123456"><br>' +
     '<input type="submit">' +
     '</form>' +
     '</body>' +
     '</html>');
});

app.post('/login', function (req,res) {
   console.log("user: " + req.body.user + " password: " +req.body.password);
   res.cookie('autenticated','1');
   res.redirect('transfer');
});

app.get('/transfer', function (req,res) {
   console.log(req.cookies);
   if (req.cookies['autenticated'] == '1') {
    res.send(	
     '<html>'+
     '<head><title>Good Transfer</title></head>' +
     '<body>' +
     '<form action="transfer" method="POST"> ' +
     '<label for="destination">Destination:</label><br>' +
     '<input type="text" id="destination" name="destination" value="good destination"><br>' +
     '<label for="amount">Amount:</label><br>' +
     '<input type="text" id="amount" name="amount" value="50 pe"><br>' +
     '<input type="submit">' +
     '</form>' +
     '</body>' +
     '</html>');
   } else {
      console.log("no autenticado");
      res.redirect('login');
   }
});

app.post('/transfer', function (req,res) {
   console.log(req.cookies);
   if (req.cookies['autenticated'] == '1') {
      console.log("destination: " + req.body.destination + " amount: " +req.body.amount);
     res.redirect('result'); //?destination='+destination+'&amount='+amount);
   } else {
      console.log("no autenticado");
      res.redirect('login');
   }
});

app.get('/result/', function (req,res) {
     res.send(	
     '<html>'+
     '<head><title>Good Transfer OK</title></head>' +
     '<body>' +
     '<a href="transfer">transfer</a><br>' +
     '<a href="logout">logout</a>' +
     '</body>' +
     '</html>');
});

app.get('/logout', function (req,res) {
   console.log("user: " + req.body.user + " password: " +req.body.password);
   res.cookie('autenticated','0');
   res.redirect('login');
});

app.listen(PORT, IP, () => {
    console.log(`Listening at ${PORT}`);
});
