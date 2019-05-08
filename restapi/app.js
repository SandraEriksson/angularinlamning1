var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/products.js");
var app = express();

// CORS - Cross-Origin Resource Sharing
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(5000, function () {
    console.log("app running on port.", server.address().port);
});

