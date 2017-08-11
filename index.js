var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

const port = process.env.PORT || 3001;
// const models = require('./models');
const regNums = require('./regNums');

var mongoose = require('mongoose');

var reg = mongoose.model('regnumbers', { number: String, location: String });
mongoose.connect('mongodb://localhost/registrationNumbers');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.engine( 'hbs', hbs( { extname: 'hbs', defaultLayout: 'main'}))
app.set( 'view engine', 'hbs' );

app.use(express.static('public'));


app.get('/', function(req,res){
   res.redirect('/registration_number')
 });

// create a route
app.get('/reg_numbers', function (req, res) {
  // var reg_num = req.body.reg_number;
 res.render('registration_number');
});
// var reg_numbers =[];
// app.post('/reg_numbers', function (req, res) {
//     var reg_num = req.body.reg_number;
//     reg_numbers.push(reg_num.toUpperCase())
//  res.render('registration_number',{reg_numbers:reg_numbers});
// });
// app.get('/reg_numbers', regNums.showRegNumbers);

app.post('/reg_numbers', function(req, res){

  // let addReg = function(req, res){

    var reg_num = req.body.reg_number;
    var Location = "";
    console.log(reg_num);

    if(reg_num.startsWith("CY")){
       Location = "Bellville";
      //  return Location
    }
    else if(reg_num.startsWith("CA")){
      Location = "Cape Town";
      // return Location;
    }
    else if(reg_num.startsWith("CJ")){
      Location = "Paarl";
      // return Location
    }
    //create a new reg number
    var newReg = new reg({number : reg_num,location:Location})
    //save the newReg number into you db
    newReg.save(function(err, data){
      if(err){
        console.log(err)
      }
      else {
        console.log("successfully added data")
        console.log(data);
        res.redirect('/reg_numbers')
      }
    })
  // }
  // let showRegNumbers = function(req, res){
  //   res.render('/registration_numbers')
  // }

});
app.get('/search', function(req, res){
  res.render('registration_number')
})
app.post('/search', function(req, res){
  var town = req.body.town;
  var regs = {}
  //  console.log(reg.find);
  if(town === "all"){
    reg.find({}, function(err, data){

      if(err){
        console.log("error");
        console.log(err);
      }
      else{
        regs = data
        console.log("searched");
        console.log("---------------------" + data);
        res.render('registration_number', {reg_numbers:data});
      }
    });
  }
else {
  try{
    reg.find({location: town}, function(err, data){

        console.log("============" +town);
        console.log(arguments);

        if(err){
          console.log("error");
          console.log(err);
        }
        else{
          regs = data
          console.log("searched");
          console.log("---------------------" + data);

          res.render('registration_number', {reg_numbers:data});
        }
      })
  }
  catch(err){
    console.log(err);
  }
}

  // }
  // res.render('registration_number',{reg_numbers:regs});
});



//start the server
app.listen(port, function () {
    console.log('Example app listening on port 3001!')
})
