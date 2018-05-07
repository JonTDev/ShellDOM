var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('WASUP BRO').end();
});

app.listen(3000, function() {
  console.log('We are listening on port 3000')
});
