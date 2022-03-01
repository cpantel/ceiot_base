const express = require("express");
const bodyParser = require("body-parser");
const {MongoMemoryServer} = require("mongodb-memory-server");
const {MongoClient} = require("mongodb");
const PgMem = require("pg-mem");

const db = PgMem.newDb();



let database = null;
const collectionName = "measurements";

async function startDatabase() {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();	

    const connection = await MongoClient.connect(uri, {useNewUrlParser: true});

    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function insertMeasurement(message) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(message);
    return insertedId;
}

async function getMeasurements() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();	
}



const app = express();

app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());

// Ejercicio: agregar timestamp
// Ejercicio: validar message
// Ejercicio: no publicar key en GET device
// Ejercicio: usar key como autenticación del POST measurement
// Ejercicio: recibir json

const PORT = 8080;

app.post('/measurement', function (req, res) {
	console.log("device i    : " + req.body.id );
	console.log("key         : " + req.body.key );
	console.log("temperature : " + req.body.t);
	console.log("humidity    : " + req.body.h);
        const {insertedId} = insertMeasurement({id:req.body.id, t:req.body.t, h:req.body.h});

	res.send("received request into " +  insertedId);
});

app.get('/', function (req, res) {
	console.log("device i    : " + req.query.id );
	console.log("temperature : " + req.query.t);
	console.log("humidity    : " + req.query.h);
	res.send("received request");
});
app.get('/measurement', async (req,res) => {
    res.send(await getMeasurements());
});

app.get('/device', function(req,res) {
    res.send( db.public.many("SELECT * FROM devices") );
});


startDatabase().then(async() => {
    await insertMeasurement({id:'1', t:'18', h:'78'});
    await insertMeasurement({id:'1', t:'19', h:'77'});
    await insertMeasurement({id:'2', t:'17', h:'77'});

    db.public.none("CREATE TABLE devices (device_id VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO devices VALUES ('1', '123456')");
    db.public.none("INSERT INTO devices VALUES ('2', '234567')");
    db.public.none("INSERT INTO devices VALUES ('3', '345678')");

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
});
