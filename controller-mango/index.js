const dbConnect = require('./config/connection');
const CrudModel = require('./model/crud.model');
const express = require('express');
const app = express();
const crudRouter = require('./routes/user.routes')
const mongoose = require('mongoose');
const userRoute = require('./routes/user.routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/crud", crudRouter);


app.use((req, res)=>{
    res.status(404).json({
        error: 'Wrong request'
    });
});

app.listen(6000,(err)=>{
    if (err) {
        console.log(err);
    }
    else{
        console.log('Port Connected!');
    }
})