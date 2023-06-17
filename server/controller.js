const { query, json} = require('express');
const controller = {};
const db = require('./dbModel');

controller.getMatches = async (req, res, next) => {
  try {
    const id = 1;
    const getMatches = 'SELECT p.id, p.name, p.owner, p.zip, p.breed, p.size, p.age, p.gender FROM pooches p RIGHT OUTER JOIN matches ON matches.matched_user = p.id WHERE matches.login_user = 1';
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
