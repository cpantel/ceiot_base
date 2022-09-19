const express = require("express");
const bodyParser = require("body-parser");
//const {MongoMemoryServer} = require("mongodb-memory-server");
const {MongoClient} = require("mongodb");
const PgMem = require("pg-mem");

const db = PgMem.newDb();

const fs = require('fs');

let database = null;
const collectionName = "measurements";
const templateError = "Error: {{error_msj}} \n";

async function startDatabase() {
//    const mongod = await MongoMemoryServer.create();
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";	
    const connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function insertMeasurement(message) {
    const {insertedId} = await database.collection(collectionName).insertOne(message);
    return insertedId;
}

async function getMeasurements() {
    return await database.collection(collectionName).find({}).toArray();	
}

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('spa'));
app.use('/js', express.static('spa'));

const PORT = 8080;

app.post('/measurement', function (req, res) {
    console.log("device id    : " + req.body.id + " key         : " + req.body.key + " temperature : " + req.body.t + " humidity    : " + req.body.h);	
    var msj;
    if(!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('t') || !req.body.hasOwnProperty('h')) {
        msj = "Error: Falta una propiedad";
    } else if (req.body.id.length === 0) {
        msj = "Error:  El id no puede estar vacio";
    } else if (req.body.t.length === 0) {
        msj = "Error:  La temperatura no puede estar vacia";
    } else if (req.body.h.length === 0) {
        msj = "Error:  La humedad no puede estar vacia";
    } else {
        var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.body.id+"'");
        if (device.length <= 0){
            msj = "ERROR: El id: " + req.body.id + " no existe para ningún dispositivo";
        }else{
            const {insertedId} = insertMeasurement({id:req.body.id, t:req.body.t, h:req.body.h});
            msj = "received measurement into " +  insertedId;
        }
    }
	res.send(msj);
});

app.post('/device', function (req, res) {
	console.log("device id    : " + req.body.id + " name        : " + req.body.n + " key         : " + req.body.k );
    var msj;
    if(!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('n') || !req.body.hasOwnProperty('k')) {
        msj = "Error: Falta una propiedad";
    } else if (req.body.id.length === 0) {
        msj = "Error:  El id no puede estar vacio";
    } else if (req.body.n.length === 0) {
        msj = "Error:  El nombre no puede estar vacio";
    } else if (req.body.k.length === 0) {
        msj = "Error:  La key no puede estar vacia";
    } else {
        var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.body.id+"'");
        if (device.length > 0){
            msj = "ERROR: El id: " + req.body.id + " ya existe para otro dispositivo";
        }else{
            db.public.none("INSERT INTO devices VALUES ('"+req.body.id+ "', '"+req.body.n+"', '"+req.body.k+"')");
            msj = "received new device";
        }
    }
	res.send("msj");
});


app.get('/web/device', function (req, res) {
	var devices = db.public.many("SELECT * FROM devices").map( function(device) {
		console.log(device);
		return '<tr><td><a href=/web/device/'+ device.device_id +'>' + device.device_id + "</a>" +
			       "</td><td>"+ device.name+"</td><td>"+ device.key+"</td></tr>";
	   }
	);
	res.send("<html>"+
		     "<head><title>Sensores</title></head>" +
		     "<body>" +
		        "<table border=\"1\">" +
		           "<tr><th>id</th><th>name</th><th>key</th></tr>" +
		           devices +
		        "</table>" +
		     "</body>" +
		"</html>");
});

/*
 * Canibalized from
 *    https://www.npmjs.com/package/sprightly
 *    https://github.com/obadakhalili/Sprightly/blob/main/index.js
 */
function render(template, vars) {
   const regexp = /<<(.*?)>>|\{\{(.*?)\}\}/;
   return template.split('\n').map( function(line) {
       for (let match = line.match(regexp), result; match;) {
	   if (match[0][0] === '<') {
		   console.log("match <");
	   } else {
	      result = vars[match[2].trim()];

	   }
           line = line.replace(match[0], result ? result : '');
	   match = line.match(regexp);
       }	       
       return line;
   }).join('\n');	
}

app.get('/web/device/:id', function (req,res) {
    var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.params.id+"'");
    console.log(device);
    var template = "";
    var params = {};
    if(device.length <= 0) {
        template = templateError;
        params = {error_msj: "The id '"+req.params.id+"' does not exists"};
    } else {
        template = "<html>"+
                     "<head><title>Sensor {{name}}</title></head>" +
                     "<body>" +
		        "<h1>{{ name }}</h1>"+
		        "id  : {{ id }}<br/>" +
		        "Key : {{ key }}" +
                     "</body>" +
                "</html>";
        params = {id:device[0].device_id, key: device[0].key, name:device[0].name};
    }
    res.send(render(template,params));
});	

app.get('/term/device/', function (req, res) {
    res.send(render(templateError, {error_msj: "An ID is required to search for a device"}));
});

app.get('/term/device/:id', function (req, res) {
    var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.params.id+"'");
    console.log(device);
    var template = "";
    var params = {};
    if(device.length <= 0) {
        template = templateError;
        params = {error_msj: "The id '"+req.params.id+"' does not exists"};
    } else {
        var red = "\33[31m";
        var green = "\33[32m";
        var blue = "\33[33m";
        var reset = "\33[0m";
        template = "Device name " + red   + "   {{name}}" + reset + "\n" +
            "       id   " + green + "       {{ id }} " + reset +"\n" +
                "       key  " + blue  + "  {{ key }}" + reset +"\n";
        params = {id:device[0].device_id, key: device[0].key, name:device[0].name};
    }
    res.send(render(template, params));
});

app.get('/measurement', async (req,res) => {
    res.send(await getMeasurements());
});

app.get('/device', function(req,res) {
    res.send( db.public.many("SELECT * FROM devices") );
});

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
});	


startDatabase().then(async() => {
    await insertMeasurement({id:'00', t:'18', h:'78'});
    await insertMeasurement({id:'00', t:'19', h:'77'});
    await insertMeasurement({id:'00', t:'17', h:'77'});
    await insertMeasurement({id:'01', t:'17', h:'77'});
    console.log("mongo measurement database Up");

    db.public.none("CREATE TABLE devices (device_id VARCHAR, name VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO devices VALUES ('00', 'Fake Device 00', '123456')");
    db.public.none("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567')");
    db.public.none("CREATE TABLE users (user_id VARCHAR, name VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO users VALUES ('1','Ana','admin123')");
    db.public.none("INSERT INTO users VALUES ('2','Beto','user123')");

    console.log("sql device database up");

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
});
