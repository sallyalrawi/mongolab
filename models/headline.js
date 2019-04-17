var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// create a new UserSchema object

var headlineSchema = new Schema({

  headline: {
    type: String,
    required: true,
    unique:true
  },
 
  summary: {
    type: String,
    required: true
  },
 
  date:String,
  saved: {
    type: Boolean,
    default:false
  }
});

// This creates our model from the above schema, using mongoose's model method
var headline = mongoose.model("headline", headlineSchema);

// Export the headline model
module.exports = headline;
