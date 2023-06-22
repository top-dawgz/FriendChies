const db = require('../models/dbModel');

const chatController = {};

chatController.findChatroom = async (req, res, next) => {
  try {
    const { matchId } = req.body;
    const query = `
    SELECT * FROM chatrooms 
    WHERE (profile1=$1 AND profile2=$2) OR (profile1=$2 AND profile2=$1)`
    const result = await db.query(query, [req.params.profileId, matchId])
    const data = result.rows;
    res.locals.chatroomId = data[0].id;
    return next();
  } catch(err) {
    return next(err);
  }
}
chatController.getMessages = async (req, res, next) => {
  try {
    const query = `
    select m.*, dp.owner, dp.name
    from messages m
    LEFT JOIN dogProfiles dp on dp.id = m.senderid
    where chatid=$1
    `;
    const data = await db.query(query, [res.locals.chatroomId]);
    res.locals.messages = data.rows;

    return next();
  } catch (e) {
    return next({ log: 'no messages found' });
  }
};

chatController.postMessages = async (req, res, next) => {
    const { senderId, messageText } = req.body
    try {
      const query = `
      INSERT into messages (
        chatId,
        senderId,
        messageText)
        VALUES ($1, $2, $3)
      `;
      const data = await db.query(query, [req.params.chatroomId, senderId, messageText]);
  
      return next();
    } catch (e) {
      return next({ log: 'no messages found' });
    }
  };

module.exports = chatController;
