const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//test
router.get('/', userController.isLoggedIn, (req, res) => {
    res.status(200).json({userId: res.locals.userId});
})

//middleware to login
router.post('/signup', userController.checkUserExists, userController.createUser, (req, res) => {
    res.status(200).send({});
})

router.post('/login', userController.verifyUser, userController.sessions, (req, res) => {
    console.log('ROUTER POST ACTIVATED IN USERROUTER')
    res.status(200).send('swag');
})

module.exports = router;