const express = require("express");

const app = express();

const IP   = 'good';
const PORT = 8080;

app.get('/', function (req,res) {
    res.send(	
     '<html>'+
     '<head><title>Good Menu</title></head>' +
     '<body>' +
     'Usted dijo: ' + req.query.msg + 
     '</ul>' +
     '</body>' +
     '</html>');
});


app.get('/error', function (req,res) {
  res.send('<html>' + 
    '<head>' + 
    '<title>Sitio legítimo</title>' + 
    '</head>' + 
    '<body>' + 
    'Fuera de servicio, espera unos minutos y vuelva a probar.' + 
    '</body>' + 
    '</html>');
});

app.listen(PORT, IP, () => {
    console.log(`Listening at ${PORT}`);
});
