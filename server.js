require('dotenv').config();
const express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://DarioPrazeres:Fernandes1973@cluster0.xvrcp.mongodb.net/market?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conneted to database'));

app.use(express.json())

var subsRouter = require('./router/subscribers');
app.use('/subscribers', subsRouter)
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.listen(port, () => {console.log('Server Started!')})