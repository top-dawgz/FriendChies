const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUsers, (req, res) => {
    res.status(200).send(res.locals.response);
})

//middleware to login
router.post('/signup', userController.createUser, (req, res) => {
    res.status(200).send(res.locals.user);
})

module.exports = router;