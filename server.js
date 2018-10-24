var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/insurance.js");
var homeassetroutes = require("./controllers/assets.js");
var userroutes = require("./controllers/user.js");


app.use(routes);
app.use(homeassetroutes);
app.use(userroutes);


app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});



