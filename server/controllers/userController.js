const db = require('../models/dbModel');
const bcrypt = require("bcryptjs")
const SALT_WORK_FACTOR = 10;

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
    console.log('createUser is activated')
    const { username, password } = req.body;
    console.log('reqBODY', req.body);

    //creating new User
    const createUserSQL = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;`;
    const swag = `SELECT * FROM users`

    let hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);

    let query = {
      text: createUserSQL,
      values: [username, hashedPassword]
    }

    const response = await db.query(createUserSQL, [username, hashedPassword]);
    
    console.log('createUserResponse', response);
    res.locals.user = response;
    
    return next();
    
  } catch (err) {
    return next('createusererror', err);
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
