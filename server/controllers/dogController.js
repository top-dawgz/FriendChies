const { query } = require('express');
const db = require('../models/dbModel');

const dogController = {};

dogController.getAllDogs = async (req, res, next) => {
  try {
    const getAllDogs = `SELECT * FROM dogProfiles`;
    const listOfDogs = await db.query(getAllDogs);
    res.locals.listOfDogs = listOfDogs.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

dogController.getMatches = async (req, res, next) => {
  try {
    // id should be profile id of logged in user
    const id = 1;
    const getMatches = `
      SELECT name, owner
      FROM dogProfiles dp
      JOIN matches 
      ON matches.match_id = dp.profile_id 
      WHERE matches.user_id = $1
    `;
    const listOfMatches = await db.query(getMatches, [id]);
    res.locals.matches = listOfMatches.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

dogController.getProfile = async (req, res, next) => {
  try {
    const profileId = req.params.profileId;
    const getProfile = `
      SELECT * FROM dogProfiles dp
      WHERE dp.profile_id = $1
    `;
    const profile = await db.query(getProfile, [profileId]);
    res.locals.profile = profile.rows;

    return next();
  } catch (err) {
    return next(err);
  }
};

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
  } catch (err) {
    return next(err);
  }
};

dogController.addSwipe = async (req, res, next) => {
  try {
    const body = req.body;
    const swiperId = body.swiper_id; //TODO: Get user info from logged in user
    const swipedId = body.swiped_id;
    const liked = body.liked;
    if (!swipedId || !swiperId || liked === undefined) {
      throw {
        message: 'Missing property in request body',
        status: 400,
      };
    }
    let query = {
      text: `SELECT * FROM dogProfiles WHERE id = $1;`,
      values: [swipedId],
    };
    let response = await db.query(query);
    query = {
      text: `INSERT INTO swipes (swiper_id, swiped_id, liked) VALUES ($1, $2, $3);`,
      values: [swiperId, swipedId, liked],
    };
    response = await db.query(query);
    return next();
  } catch (err) {
    return next(err);
  }
};

dogController.addToUserLikes = async (req, res, next) => {};

dogController.checkForMatch = async (req, res, next) => {
  try {
    if (req.body.liked === false) {
      res.locals.matchFound = false;
      return next();
    }
    const body = req.body;
    const swiperId = body.swiped_id; //TODO: Get user info from logged in user
    const swipedId = body.swiper_id;
    query = {
      text: `SELECT * FROM swipes WHERE swiper_id = $1 AND swiped_id = $2 AND liked = true`,
      values: [swiperId, swipedId],
    };
    // If we find an entry the database, then we have a match
    const response = await db.query(query);
    console.log('response.rows[0]', response.rows[0]);
    if (response.rows[0]) res.locals.matchFound = true;
    else res.locals.matchFound = false;
    return next();
  } catch (err) {
    return next(err);
  }
};

dogController.updateMatch = async (req, res, next) => {};

// Create new profile in SQL
dogController.createProfile = async (req, res, next) => {
  try {
    // Hardcoded user Id for now
    req.body = {
      user_id: 20,
    };
    const { name, breed, owner, age, sex, size, about, user_id } = req.body;
    query = {
      text: `INSERT into dogProfiles (owner, name, sex, breed, size, age, about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      values: [owner, name, sex, breed, size, age, user_id, about],
    };
    let response = await db.query(query);
    res.locals.newProfile = response;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = dogController;
