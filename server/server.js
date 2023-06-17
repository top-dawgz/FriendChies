const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRoute');
const controller = require('./controller');
const router = express.Router();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

// Build file
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/', express.static(path.join(__dirname, '../client/')));

app.use('/api/user', userRouter);

// Add this line to include the router
app.use('/api', router);

// serve index.html
router.get('/matches', controller.getMatches, (req, res) => {
  return res.status(200).json(res.locals.matches);
});

app.get('/*', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
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
