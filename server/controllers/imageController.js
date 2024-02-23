const db = require("../models/dbModel");

const imageController = {};

imageController.getAllUserImages = async (req, res, next) => {
  try {
    userId = req.user.id;
    query = {
      text: `SELECT file_name FROM images WHERE user_id = $1;`,
      values: [userId],
    };
    response = await db.query(query);
    const response = await db.query(query);
    res.locals.images = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

imageController.postImage = async (req, res, next) => {
  try {
    userId = req.user.id;
    fileName = req.body.fileName;
    query = {
      text: `INSERT INTO images (user_id, file_name) VALUES ($1, $2);`,
      values: [userId, fileName],
    };
    response = await db.query(query);
    const response = await db.query(query);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = imageController;
