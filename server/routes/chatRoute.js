const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// /api/chat/
router.get('/:chatroomId', chatController.getMessages, (req,res) => {
    res.status(200).send(res.locals.messages);
} )

module.exports = router;
