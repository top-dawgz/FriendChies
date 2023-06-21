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

userController.validateUser = async (req, res, next) => {
  const { username, password, passwordConfirmation } = req.body;

  if (!username || password < 3) {
    return res.status(400).send({message: 'Please enter a username with minimum of 3 characters'})
  }
  if (!password || password.length < 6) {
    return res.status(400).send({message: 'Please enter a password with minimum of 6 characters'})
  }

  if (!passwordConfirmation || password != passwordConfirmation) {
    return res.status(400).send({message: 'Both passwords must match'})
  }
  return next();
}

userController.createUser = async (req, res, next) => {
    console.log('createUser is activated')

    //req.body
    const { username, password, passwordConfirmation } = req.body;
    console.log('reqBODY', req.body);
    //creating new User
    const createUserSQL = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;`;
    
    // if (!username) {
    //   return res.status(400).send({message: 'username should not be empty'})
    // }

    // if (!password || password.length < 6) {
    //   return res.status(400).send({message: `Please enter a password with minimum 6 characters`})
    // }
    
    // if (!passwordConfirmation || password != passwordConfirmation) {
    //   return res.status(400).send({message: `Both passwords must match`})
    // }
    
    //check for user
    // await db.query(`SELECT * FROM users WHERE username= $1`, [username], async (err, result) => {
    //   if (err) {
    //     return res.status(400).send({message: err})
    //   }
    //   //check if username exist
    //   if (result.length !== 0) {
    //     //error for is username exists
    //     return res.status(409).send({
    //       message: `This username is already in use!`
    //     })
    //   } 
    // })
    //username not in use
    const hashPassword = await bcrypt.hash(password, SALT_WORK_FACTOR)

    //make the account with username and password
    await db.query(createUserSQL, [username, password], (err, result) => {
      if (err) {return res.status(400).send({message: err})}
    })

    // await db.query('SELECT * FROM users WHERE username=?', username,(err,result) => {
        //   if (err) {
        //     return res.status(400).send({message:err})
        //   }
        //    return res.status(201)
        //     .send({
        //         userdata:user,
        //         msg:"successfully registered"
        //       })
        //  })
};

userController.getLoggedInUserData = async (req, res, next) => {
  //TODO: Get logged in user with JWT and sessions.
  //Until this is implemented, get the logged in user's id
  //with req.user.id, which is set to 1.
  const { username, password } = req.body;
  console.log('GETLOGGEDIN USERNAME', username);
  console.log('GETLOGGEDIN PASSWORD', password);
  const findUserSQL = `SELECT * FROM users WHERE (username, password) = ($1, $2);`
  //check if there is an empty string for either username or password
  if(username.trim()===''||password.trim()===''){
    return res.status(400).send({message: "email or password must not be empty"})
}

  //check if user exist
  try {
    const response = await db.query(findUserSQL, [username, password])
      //give an error
      
      console.log('findUSERSQL query activated')
      console.log('findUSERSQLresponse', response.rows)
      
      if (!response.rows.length) {
        throw new Error('response.row is an empty array')
      } else {
        // console.log('before token generation')
        //  const token= jwt.sign({id:result[0].user_id.toString()}, process.env.SECRET_KEY)   
            
        //    return res.status(200).send({
        //     msg:"logged in successfully",
        //     user:result[0],
        //     token
        //  })
      }

      // if (err) {
      //   return res.status(400).send({
      //     message: 'findUserSQP db.query', err
      //   })
      // }
  
      // //check user exists
      // if (result.length === 0) {
      //   return res.status(401).send({
      //     message: 'Username or Password is incorrect'
      //   })
      // }
  
      return next();
  
      //check password
      // bcrypt.compare(password, result[0].password).then(isMatch => {
      //   console.log('password bcrypt compare activated')
      //   if (isMatch === false) {
      //       return res.status(401).send({
      //         msg:"Username or Password is incorrect "
      //     })
      // }
  
      //  //generate token
      //  console.log('before token generation')
      //  const token= jwt.sign({id:result[0].user_id.toString()}, process.env.SECRET_KEY)   
          
      //    return res.status(200).send({
      //     msg:"logged in successfully",
      //     user:result[0],
      //     token
      //  })
      // })
  }
  catch (e) {
    next(e)
  }
  
  //authenticate user with jwt
  // userController.Authentication = async (req, res, next) => {
  //   try {
  //     const idToken = req.header('Authorization').replace('Bearer ', '')
  //     const decoded = jwt.verify(idToken, process.env.SECRET_KEY)

  //     req.id = decoded.id

  //     sql = 'SELECT * FROM users where id = ?'
  //     db.query(sql, decoded.id, (err, results) => {
  //       if (err) {return res.status(400).send({message: error})}
  //       return next();
  //     })
  //   }
  //   catch (e) {
  //     res.status(401).send({error: 'please authenticate'})
  //   }
  // }

}

module.exports = userController;
