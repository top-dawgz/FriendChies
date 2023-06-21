const express = require('express');
const path = require('path');
const cors = require("cors");

const userRouter = require('./routes/userRoute');
const profileRouter = require('./routes/profileRoute');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Build file
app.use(express.static('../client/'));
// app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/api/user', userRouter);
app.use('/api/dogs', profileRouter);

// serve index.html
app.get('/*', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port 3000.`));
