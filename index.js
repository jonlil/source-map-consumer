var express = require('express');
var app = express();
var sourcemap = require('./lib/sourcemap');
var bodyParser = require('body-parser');

app.set('views', './lib/views')
app.set('view engine', 'jade');

app.use(express.static('public'));

// Ugly mount hack :)
app.use('/styles/normalize.css', express.static('bower_components/normalize.css/normalize.css'));
app.use('/js/angular.js', express.static('bower_components/angular/angular.js'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
  res.render('index');
});

app.post('/lookup', function(req, res) {
  sourcemap(req.body)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      next(err);
    });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Sourcemap consumer listening at http://%s:%s', host, port);
});
