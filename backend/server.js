const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

dotenv.config()
app.use(bodyParser.json())
app.use(cors())


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'passop';

client.connect();
// get all password from database
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
// save password to database
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
})
app.put('/', async (req, res) => {
  const { id, url, username, password } = req.body;

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  // const findResult = await collection.findOneAndUpdate(password);

  const result = await collection.updateOne(
    { id: id },
    {
      $set: {
        url,
        username,
        password,
      },
    }
  );
  res.send(`${result.modifiedCount} document(s) updated`);
})



// delete password from database
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
})

let port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port: http//localhost:${port}`)
})