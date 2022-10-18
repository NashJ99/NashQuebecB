require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
let userName = ''; 
let posts = ''; 


async function main(){
    try {
        await client.connect();
        console.log("connected baby!")

        //databasesList = await client.db().admin().listDatabases();
        
        //console.log("Databases:");
        //databasesList.databases.forEach(db => console.log(` - ${db.name}`));
                
        posts = await client.db("NashPapa").collection("Papacis486").findOne();
        console.log(posts); 
        return posts; 

        return "somehting"; 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
app.get('/', async function (req, res) {
    
    const result = await main().catch(console.error);
    console.log("results: ", result);
    //res.send(`results:  ${ result }`);
    // res.send(result.name); 
    res.render('index', {
        userName : result.class
    })
});

app.post('/addinfo', async function (req, res) {
    
   //can you hardcode an database entyr.. 
});


app.listen(PORT, console.log(`server is running on port: ${PORT}` ));