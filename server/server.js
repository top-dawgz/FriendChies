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
