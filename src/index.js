const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const morgan = require('morgan')

//-----Global middleware.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//-----using multer.
app.use(multer().any());

//-----MongoDb connection.
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Lalit:g1b1eD2zYIwUl67Z@cluster0.xmtgwuj.mongodb.net/KLProject-Db", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port', (process.env.PORT || 3000))
});