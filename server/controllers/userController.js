const db = require('../models/dbModel');
const bcrypt = require("bcryptjs");
const express = require('express');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

userController.checkUserExists = async (req, res, next) => {
  const { username, password, passwordConfirmation } = req.body;

  // check for user
  try {
    const result = await db.query(`SELECT * FROM users WHERE username= $1`, [username]);
    if (result.rows.length !== 0) {
      //error for is username exists
      return res.status(409).send({
        message: `This username is already in use!`
      })
    } else {
      return next();
    }

  } catch(err) {
    return res.status(400).send({message: err})
  }
}

userController.createUser = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      //creating new User
      const createUserSQL = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;`;
      const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR)
  
      //make the account with username and password
      await db.query(createUserSQL, [username, hashPassword]);
      return next();
    }
    catch (e) {
      return next(e)
    }
    //req.body
   
};

userController.verifyUser = async (req, res, next) => {
  //TODO: Get logged in user with JWT and sessions.
  //Until this is implemented, get the logged in user's id
  //with req.user.id, which is set to 1.
  const { username, password } = req.body;
  const findUserSQL = `SELECT * FROM users WHERE username = $1;`
  

  //check if user exist
  try {
    const response = await db.query(findUserSQL, [username])
    const data = response.rows;
    
      //give an error
      if (!response.rows.length) {
        throw new Error('response.row is an empty array')
      } else {
      res.locals.userId = data[0].id;
        //check password
      const match = await bcrypt.compare(password, data[0].password)
      
      if (match) {
      return next();

      } else {
        return res.status(401).send({
          msg:"Username or Password is incorrect "
        })
      }
    }
}
  catch (e) {
    next(e)
    }
}

userController.sessions = async (req, res, next) => {
  const user = res.locals.userId;
  const jwtToken = await jwt.sign({id: user}, process.env.SECRET_KEY)
  res.cookie('ssid', jwtToken, {httpOnly: true, secure: false})
  return next();
}

userController.isLoggedIn = async (req, res, next) => {
  // should set res.locals.userId to be userId
 try {
  if (req.cookies.ssid) {
    const verified = await jwt.verify(req.cookies.ssid, process.env.SECRET_KEY)
    res.locals.userId = verified.id;
    return next();
  } else {
    res.locals.userId = 0;
    return next();
  }
 }
  catch (e) {
    console.error(e)
    return next(e)
  }
}

module.exports = userController;

// if (!username) {
    //   return res.status(400).send({message: 'username should not be empty'})
    // }

    // if (!password || password.length < 6) {
    //   return res.status(400).send({message: `Please enter a password with minimum 6 characters`})
    // }
    
    // if (!passwordConfirmation || password != passwordConfirmation) {
    //   return res.status(400).send({message: `Both passwords must match`})
    // }

    //check if there is an empty string for either username or password
//   if(username.trim()===''||password.trim()===''){
//     return res.status(400).send({message: "email or password must not be empty"})
// }