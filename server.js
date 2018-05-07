const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.ShellDOM = {
  header: 'ShellDOM.io'
};
require('./extensions/socket')(io);

// Setting Render Engine
app.set('view engine', 'pug');

// Setting Render view directory
app.set('views', `${__dirname}/views`);

// Setting static files to be served.
app.use('/', express.static(`${__dirname}/views/js`));
app.use('/', express.static(`${__dirname}/views/css`));
app.use('/front', express.static(`${__dirname}/front`));


// Endpoints
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/update/:value', (req, res) => {
  io.ShellDOM.header = req.params.value;
  console.log(req.params.value);
  res.json(io.ShellDOM).end();
});

app.get('/api', (req, res) => {
  res.json({ header : 'AJAX' }).end();
});

http.listen(3000, () => { console.log('Listening on port 3000') });
