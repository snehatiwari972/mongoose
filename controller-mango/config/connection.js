// const { MongoClient } = require("mongodb"); //The MongoClient is a class provided by the mongodb package that allows you to create a connection
// const url = 'mongodb://localhost:27017';
// const database = 'student';
// const client = new MongoClient(url);

// async function dbConnect() // This defines an asynchronous function named getData.
// {
//   let result = await client.connect(); // This line likely connects to a database using some client object (possibly a MongoDB client). The await keyword is used to wait for the client.connect() function to complete before moving on to the next line.
//    db = result.db(database);
//   return db.collection('records');
//   // let response = await collection.find({}).toArray(); // yaha query perform hogi ki jo bhi data collection me hai wo sab array me convert ho jaye and await keyword ensure karega ki jab tak ye task perform ho raha hai tab tak dusri line me jaane se pahle ye wait kare 
//   // console.log(response);
// }

// // dbonnect();

// module.exports = dbConnect;


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/student");