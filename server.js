const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Setting Render Engine
app.set('view engine', 'pug');
// Setting Render view directory
app.set('views', `${__dirname}/views`);

// Setting static files to be served.
app.use('/', express.static(`${__dirname}/views/js`));
app.use('/', express.static(`${__dirname}/views/css`));

app.get('/', (req, res) => {
  res.render('index');
});

http.listen(3000, () => { console.log('Listening on port 3000') });
