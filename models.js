var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/registrationNumbers');

var reg = mongoose.model('regNumbers', { number: String, location: String });

module.exports = function(mongoURL){

  mongoose.connect(mongoURL);

  return {
    reg
  }

}
