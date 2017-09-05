var express = require('express');
var bodyParser = require('body-parser');
//var session = require('express-session')
var hbs = require('express-handlebars');

const port = process.env.PORT || 3001;
// const models = require('./models');
const regNums = require('./regNums');

var mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/registrationNumbers";
mongoose.connect(mongoURL);
var reg = mongoose.model('regnumbers', {
  number: String,
  location: String
});

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs');

app.use(express.static('public'));


app.get('/', function(req, res) {
  res.render('registration_number')
});

// create a route
app.get('/reg_numbers', function(req, res) {
  reg.find({}, function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('registration_number', {reg_numbers:data});
  }
})
});


app.post('/reg_numbers', function(req, res) {
  var reg_num = req.body.reg_number;
  var Location = "";
  // console.log(reg_num);
  reg.findOne({
    number: reg_num
  }, function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      if (!data) {
        if (reg_num.startsWith("CY")) {
          Location = "Bellville";
          //  return Location
        } else if (reg_num.startsWith("CA")) {
          Location = "Cape Town";
          // return Location;
        } else if (reg_num.startsWith("CJ")) {
          Location = "Paarl";
          // return Location
        }
        //create a new reg number
        var newReg = new reg({
          number: reg_num,
          location: Location
        })
        //save the newReg number into you db
        newReg.save(function(err, data) {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/reg_numbers')
          }
        });
      }
      else {
        console.log("Registation number exist already");
        var message = "Registation number exist already";
        res.render('registration_number', {message:message});
      }
    }
  })
});
app.get('/search', function(req, res) {
  res.render('registration_number')
})
app.post('/search', function(req, res) {
  var town = req.body.town;
  var regs = {}
  //  console.log(reg.find);
  if (town === "all") {
    reg.find({}, function(err, data) {

      if (err) {
        console.log("error");
        console.log(err);
      } else {
        regs = data
        console.log("searched");
        console.log("---------------------" + data);
        res.render('registration_number', {
          reg_numbers: data
        });
      }
    });
  } else {
    try {
      reg.find({
        location: town
      }, function(err, data) {

        // console.log("============" + town);
        // console.log(arguments);

        if (err) {
          console.log("error");
          console.log(err);
        } else {
          regs = data
          console.log("searched");
          console.log("---------------------" + data);

          res.render('registration_number', {
            reg_numbers: data
          });
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  // }
  // res.render('registration_number',{reg_numbers:regs});
});



//start the server
app.listen(port, function() {
  console.log('Example app listening on port 3001!')
})
