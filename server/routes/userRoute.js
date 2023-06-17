const express = require('express');
const userController = require('../userController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
    res.status(200).send(res.locals.user);
})

module.exports = router;