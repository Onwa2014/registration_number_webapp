var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

const port = process.env.PORT || 3001;

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
var reg_numbers =[];
app.post('/reg_numbers', function (req, res) {
    var reg_num = req.body.reg_number;
    reg_numbers.push(reg_num.toUpperCase())
 res.render('registration_number',{reg_numbers:reg_numbers});
});

//start the server
app.listen(port, function () {
    console.log('Example app listening on port 3001!')
})
