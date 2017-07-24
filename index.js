var express = require('express');
var app = express();
var hbs = require('express-handlebars');
app.engine( 'hbs', hbs( { extname: 'hbs', defaultLayout: 'main'}))
app.set( 'view engine', 'hbs' );

app.use(express.static('public'));

// create a route
app.get('/reg_number/:registration', function (req, res) {
  var reg_num = req.params.registration
 res.render('registration_number',{reg_num});
});

//start the server
var server = app.listen(3001, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);

});
