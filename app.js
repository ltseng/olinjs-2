var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/olin', function(req, res){
  res.send('hello olin');
});

app.listen(3000);
