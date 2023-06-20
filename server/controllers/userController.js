const db = require('../models/dbModel');

const userController = {};

userController.getUsers = async (req, res, next) => {
  try {
    const createUserSQL = 'SELECT * FROM users';

    const response = await db.query(createUserSQL);

    res.locals.response = response;
    return next();
  } catch (err) {
    return next(err);
  }
};
userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const createUserSQL = `INSERT INTO users (username, password)
    VALUES ($1, $2)`;

    const response = await db.query(createUserSQL, [username, password]);

    res.locals.user = response;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
