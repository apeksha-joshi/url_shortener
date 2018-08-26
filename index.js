const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const mongoURI = "mongodb://localhost/url-shortner";
const connectOptions={
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};
mongoose.connect(mongoURI,connectOptions,(err,db)=>{
    if(err) console.log('Error',err);
    console.log('Connected to MongoDB');
});
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
	res.render('shorturl')
});
require("./models/UrlShorten");
require("./routes/urlshorten")(app);
const PORT = 7000;
//Start server on Port 7000
app.listen(PORT, () => {
 console.log(`Server started on port`, PORT);
});