require('dotenv').config();
const express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var port = process.env.PORT || 3000;
var dev_db_url = 'mongodb://127.0.0.1/subscribers';
var mongoDB = dev_db_url;

mongoose.connect(mongoDB, {useNewUrlParser:true});                                                                     
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB conection error:')); 
db.once('open', () => console.log('Conneted to database'));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
var subsRouter = require('./router/subscribers');
app.use('/subscribers', subsRouter)
app.get("/api", (req, res) => {
    console.log('api')
    res.send({ message: "Hello from server!" });
});
app.listen(3000, () => {console.log('Server Started!')})