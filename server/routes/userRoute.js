const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUsers, (req, res) => {
    res.status(200).send(res.locals.response);
})

//middleware to login
router.post('/signup', userController.createUser, (req, res) => {
    res.status(200).send({});
})

router.post('/login', userController.getLoggedInUserData, (req, res) => {
    console.log('ROUTER POST ACTIVATED IN USERROUTER')
    res.status(200).send('swag');
})

module.exports = router;