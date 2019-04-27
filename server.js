var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");
// Require our routes
var routes = require("./routes");
// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware
app.use(routes);

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  