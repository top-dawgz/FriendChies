const db = require('../models/dbModel');

const dogController = {};

dogController.getAllDogs = async (req, res, next) => {
  try {
    const getAllDogs = `SELECT * FROM dogProfiles`;
    const listOfDogs = await db.query(getAllDogs);
    res.locals.listOfDogs = listOfDogs.rows;
    return next();
  } catch(err) {
    return next(err);
  }
}

dogController.getMatches = async (req, res, next) => {
  try {
    // id should be profile id of logged in user
    const id = 1;
    const getMatches = `
      SELECT name, owner, match_id, img_src
      FROM dogProfiles dp
      JOIN matches 
      ON matches.match_id = dp.id 
      WHERE matches.profile_id = $1
    `;
    const listOfMatches = await db.query(getMatches, [id]);
    res.locals.matches = listOfMatches.rows;
    return next();
  } catch (err){
    return next(err);
  }
}

dogController.getProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    const getProfile = `
      SELECT * FROM dogProfiles dp
      WHERE dp.id = $1
    `;
    const profile = await db.query(getProfile, [profileId]);
    res.locals.profile = profile.rows[0];

    return next();
  } catch (err){
    return next(err);
  }
}

dogController.getPotentialMatches = async (req, res, next) => {
  try {
    const id = req.user.id; // assuming req.user contains the logged-in user's info

    // This SQL query returns pooches that the current user has not viewed yet.
    // pooches is now dogProfiles
    const getPotentialMatches = `
      SELECT * 
      FROM dogProfiles 
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
