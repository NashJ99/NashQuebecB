require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function (req, res) {
    client.connect(err => {
        const collection = client.db("NashPapa").collection("Papacis486");
        console.log('connected!');
        const result = collection.find( { title: "name"} ); //.toArray();
         console.log(result.content);
            res.send(result.content);
        });
    });
app.listen(process.env.PORT || 3000,
        () => console.log(`server is running on port: ${process.env.PORT}` ));