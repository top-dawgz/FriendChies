const { query, json} = require('express');
const controller = {};
const db = require('./dbModel');

controller.getMatches = async (req, res, next) => {
  try {
    const getMatches =
    'SELECT login_user FROM matches';
    const listOfMatches = await db.query(getMatches);
    res.locals.matches = listOfMatches.rows;
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
