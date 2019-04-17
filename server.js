var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Routes
// ======

// A GET route for scraping the nytimes website
app.get("/saved.html", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.nytimes.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every theme-summary 
    $(".theme-summary").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the head and sum of every artical, and save them as properties of the result object
      result.head = $(this)
        .children(".story-heading")
        .text().trim();
      result.sum = $(this)
        .children(".summary")
        .text().trim();
         // Create a new Article using the `result` object built from scraping
         db.Article.create(result)
         .then(function(dbArticle) {
           // View the added result in the console
           console.log(dbArticle);
         })
         .catch(function(err) {
           // If an error occurred, log it
           console.log(err);
         });
     });
   
    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// // Route for scrape a new Article from the db


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  