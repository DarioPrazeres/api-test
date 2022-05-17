require('dotenv').config();
const express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_LINK , {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conneted to database'));

app.use(express.json())

var subsRouter = require('./router/subscribers');
app.use('/subscribers', subsRouter)
app.listen(3000, () => console.log('Server Started!'))