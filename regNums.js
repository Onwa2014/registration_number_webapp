

module.exports = function() {

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/registrationNumbers');

  var reg = mongoose.model('regNumbers', { number: String, location: String });

  let addReg = function(req, res){

    var reg_num = req.body.reg_number;
    var Location = "";
    console.log(reg_num);

    if(reg_num.startsWith("CY")){
       Location = "Bellville";
       return Location
    }
    else if(reg_num.startsWith("CA")){
      Location = "Cape Town";
      return Location;
    }
    else if(reg_num.startsWith("CJ")){
      Location = "Paarl";
      return Location
    }
    //create a new reg number
    var newReg = new reg({number : reg_num,location:Location})
    //save the newReg number into you db
    newReg.save(function(err, data){
      if(err){
        console.log(err)
      }
      else {
        console.log(data);
        res.redirect('/registration_numbers')
      }
    })
  }
  let showRegNumbers = function(req, res){
    res.render('/registration_numbers')
  }

  return {
    addReg,
    showRegNumbers
  }

}
