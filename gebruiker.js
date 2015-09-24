var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// gebruikers schema
//nothing special
var GebruikerSchema = new Schema({
  name: String,
  //bsn should be unique 
  bsn: {
    type: String,
    unique: true
  },
  duo: Boolean,
  bkr: Boolean
});

module.exports = mongoose.model('Gebruiker', GebruikerSchema);
