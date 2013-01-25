
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

mongoose.connect('localhost');

var schema = mongoose.Schema({name: 'string'});
var Cat = mongoose.model('Dog', schema);

app.configure(function(){
  app.set('port', process.env.PORT || 3000); // sets up the port
  app.set('views', __dirname + '/views'); // sets the path for views
  app.set('view engine', 'jade'); // sets the engine that the views are rendered with
  app.use(express.favicon()); // default favicon
  app.use(express.logger('dev')); // error logging
  app.use(express.bodyParser()); // 
  app.use(express.methodOverride());
  app.use(app.router); // 
  app.use(express.static(path.join(__dirname, 'public'))); // sets the path for public files (css & js)
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/users/new', user.new);
app.get('/cats/new', function(req, res){
	var kitty = new Cat({name: 'Zildjian'});

	kitty.save(function(err){
		if (err)
			return console.log("error", err);
		res.send('meow');
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
