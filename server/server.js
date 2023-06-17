const express = require('express');
const path = require('path');

const app = express();




// Build file
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/', express.static(path.join(__dirname, '../client/')));
// serve index.html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000);




// const express = require('express');
// const app = require (express());
// const path = require('path');
// const controller = require('./controller.js');
// const PORT = 3000;
// const router = express.Router();

// app.use(express.json());
// app.use('/', router);

// router.get('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../index.html')) // directs to front page
// });

// router.post('/', MIDDLEWARE (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, 'PATH TO ALL MATCHES'))
// });

router.get('/matches', MIDDLEWARE (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'PATH TO ALL MATCHES'))
});

router.post('/matches', MIDDLEWARE (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'PATH TO ALL MATCHES'))
});

// router.get('/matchCard', MIDDLEWARE (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, 'PATH TO MATCHCARD'))
// });

// router.post('/matchCard', MIDDLEWARE (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, 'PATH TO MATCHCARD'))
// });
