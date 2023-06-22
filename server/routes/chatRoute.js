const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// /api/chat/
router.put('/:profileId', chatController.findChatroom, chatController.getMessages, (req,res) => {
    res.status(200).send(res.locals.messages);
} )

router.post('/:chatroomId', chatController.postMessages, (req,res) => {
    res.status(200).send('res.locals.messages');
} )

module.exports = router;
