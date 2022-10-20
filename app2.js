require("dotenv").config();
const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
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

        //databasesList = awit client.db().admin().listDatabases();
        
        //console.log("Databases:");
        //databasesList.databases.forEach(db => console.log(` - ${db.name}`));
                
        posts = await client.db("NashPapa").collection("Papacis486").find().toArray();
        console.log(posts); 
        return posts; 

        // return "somehting"; 
    } catch (e) {
        console.error(e);
    } finally {
        // awit client.close();
    }
}
app.get('/', async  (req, res) => {
    
    const result = await main().catch(console.error);
    console.log("results: ", result);
    //res.send(`reslts:  ${ reslt }`);
    // res.send(reslt.name); 
    res.render('index', {
        topics : result
        // Papacis486 : result didnt work   
        //displays info from database do to "username" it will display at the top as the username
    })
});

app.post('/addinfo', async function (req, res) {
    try {
        client.connect;
        const collection = client.db("NashPapa").collection("Papacis486");
        await collection.insertOne(req.body);
        res.redirect('/');
    }
    // catch(e){
    //     console.log(error)
    // }
    finally{
        // client.close()
       }


    
    
   //can you hardcode an database entyr.. 
});

app.post('/deleteinfo/:id', async (req, res) => {
    try {
        console.log("req.parms.id: ", req.params.id)
        client.connect; 
        const collection = client.db("NashPapa").collection("Papacis486");
        let result = await collection.findOneAndDelete(
            {
                "_id": ObjectId(req.params.id)
            }
        )
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error))
    }
    finally{
        //client.close() make sure to comment this out before testing
    }
})
// app.post('/updateid/:id', async (req,res) => {
//     client.connect;
//     const collection = client.db("NashPapa").collection("Papacis486");
//     let result = await collection.findOneAndUpdate(
//       {
//         "_id": ObjectId(req.params.id)
//       },
//       {
//         $set: {
//             class: 'done'
        
//         }
//       }
//     )
//     .then(result => {
//       console.log(result); 
//       res.redirect('/');
//     })
//     .catch(error => console.error(error))
//   })
    




app.listen(PORT, console.log(`server is running on port: ${PORT}` ));