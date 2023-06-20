const db = require('../models/dbModel');

const dogController = {};

dogController.getAllDogs = async (req, res, next) => {
  try {
    const getAllDogs = `SELECT * FROM Pooches`;
    const listOfDogs = await db.query(getAllDogs);
    res.locals.listOfDogs = listOfDogs.rows;
    return next();
  } catch(err) {
    return next(err);
  }
}

dogController.getMatches = async (req, res, next) => {
  try {
    const id = 1;
    const getMatches = 'SELECT p.id, p.name, p.owner, p.zip, p.breed, p.size, p.age, p.gender FROM pooches p RIGHT OUTER JOIN matches ON matches.matched_user = p.id WHERE matches.login_user = 1';
    const listOfMatches = await db.query(getMatches);
    res.locals.matches = listOfMatches.rows;
    return next();
  } catch (err){
    return next(err);
  }
}

dogController.getPotentialMatches = async (req, res, next) => {
  try {
    const id = req.user.id; // assuming req.user contains the logged-in user's info

    // This SQL query returns pooches that the current user has not viewed yet.
    const getPotentialMatches = `
      SELECT * 
      FROM Pooches 
      WHERE id NOT IN (
        SELECT dog_id 
        FROM Viewed 
        WHERE user_id = ${id}
      )
      AND owner != ${id}; // excluding the current user's pooch from potential matches
    `;
    
    const potentialMatches = await db.query(getPotentialMatches);
    res.locals.potentialMatches = potentialMatches.rows;
    return next();
  } catch (err){
    return next(err);
  }
}

dogController.addToUserLikes = async (req, res, next) => {

}

dogController.checkForMatch = async (req, res, next) => {

}

dogController.updateMatch = async (req, res, next) => {

}


module.exports = dogController;
