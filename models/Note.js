var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// create a new UserSchema object

var noteSchema = new Schema({

  _headlineId: {
    type: Schema.Types.ObjectId,
    ref:"headline"
  },

  date:String,
  noteText:String 

});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;
