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

userController.getLoggedInUserData = async (req, res, next) => {
  //TODO: Get logged in user with JWT and sessions.
  //Until this is implemented, get the logged in user's id
  //with req.user.id, which is set to 1.
  req.user = {
    id: 1
  };
  return next();
}
module.exports = userController;
