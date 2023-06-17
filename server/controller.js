const { query, json} = require('express');
const controller = {};
const db = require('./dbModel');

controller.getMatches = async (req, res, next) => {
  try {
    const id = 1;
    const getMatches = `SELECT * FROM Matches WHERE login_user = ${id}`;
    const listOfMatches = await db.query(getMatches);
    console.log(listOfMatches);
    res.locals.matches = listOfMatches.rows;
    console.log(res.locals.matches);
    return next();
  } catch (err){
    return next(err);
  }
}

controller.addToUserLikes = async (req, res, next) => {

}

controller.checkForMatch = async (req, res, next) => {

}

controller.updateMatch = async (req, res, next) => {

}


module.exports = controller;
