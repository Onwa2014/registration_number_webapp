var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.engine( 'hbs', hbs( { extname: 'hbs', defaultLayout: 'main'}))
app.set( 'view engine', 'hbs' );

app.use(express.static('public'));

// create a route
app.get('/reg_numbers', function (req, res) {
  // var reg_num = req.body.reg_number;
 res.render('registration_number');
});
var reg_numbers =[];
app.post('/reg_numbers', function (req, res) {
    var reg_num = req.body.reg_number;
    reg_numbers.push(reg_num)
 res.render('registration_number',{reg_numbers:reg_numbers});
});

//start the server
var server = app.listen(3001, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);

});
