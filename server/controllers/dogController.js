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
      SELECT name, owner, match_id, img_src
      FROM dogProfiles dp
      JOIN matches 
      ON matches.match_id = dp.id 
      WHERE matches.profile_id = $1
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
      WHERE dp.id = $1
    `;
    const profile = await db.query(getProfile, [profileId]);
    res.locals.profile = profile.rows[0];

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
    const swiperId = req.user.id;
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
    // If the swipe already exists, don't add a duplicate to the table
    query = {
      text: `SELECT * FROM swipes WHERE swiper_id = $1 AND swiped_id = $2;`,
      values: [swiperId, swipedId],
    };
    response = await db.query(query);
    // Do nothing if we get response
    if (response.rows[0]) {
      return next();
    }
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
    const swiperId = req.user.id;
    const swipedId = body.swiped_id;
    if (swiperId === swipedId) {
      throw {
        message: `The logged in user\'s ID (${swiperId})can not be the same as the swiped user\'s ID (${swipedId})`,
        status: 400,
      };
    }
    // Check if the swiped user already swiped on the swiper
    query = {
      text: `SELECT * FROM swipes WHERE swiper_id = $1 AND swiped_id = $2 AND liked = true`,
      values: [swipedId, swiperId],
    };
    // If we find an entry the database, then we have a match
    let response = await db.query(query);
    if (response.rows[0]) res.locals.matchFound = true;
    else res.locals.matchFound = false;
    // Check if the new match already exists
    query = {
      text: `SELECT * FROM matches WHERE profile_id = $1 AND match_id = $2`,
      values: [swiperId, swipedId],
    };
    response = await db.query(query);
    // If the match does not exist yet
    if (!response.rows[0]) {
      // Add to matches table
      query = {
        text: `INSERT INTO matches (profile_id, match_id) VALUES ($1, $2);`,
        values: [swiperId, swipedId],
      };
      response = await db.query(query);
    }
    // Add opposite to matches table too
    // Check if the new match already exists
    query = {
      text: `SELECT * FROM matches WHERE profile_id = $1 AND match_id = $2`,
      values: [swipedId, swiperId],
    };
    response = await db.query(query);
    // If the match does not exist yet
    if (!response.rows[0]) {
      // Add to matches table
      query = {
        text: `INSERT INTO matches (profile_id, match_id) VALUES ($1, $2);`,
        values: [swipedId, swiperId],
      };
      response = await db.query(query);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

dogController.updateMatch = async (req, res, next) => {};

dogController.removeMatch = async (req, res, next) => {
  try {
    const { matchId } = req.body;
    const deleteQuery = `
    DELETE FROM matches
    WHERE (profile_id = $1 AND match_id = $2) OR (profile_id = $2 AND match_id = $1)
    `;
    const response = await db.query(deleteQuery, [req.params.profileId, matchId]);
    console.log(response);
  } catch (e) {
    next(e);
  }
};

dogController.removeMatch = async (req, res, next) => {
  try {
    const { matchId } = req.body;
    const deleteQuery = `
    UPDATE swipes
    SET liked = false
    WHERE (swiper_id = $1 AND swiped_id = $2);
    `;
    const response = await db.query(deleteQuery, [req.params.profileId, matchId]);
    console.log(response);
  } catch (e) {
    next(e);
  }
};

// Create new profile in SQL
dogController.createProfile = async (req, res, next) => {
  try {
    console.log(req.body);
    // Hardcoded user Id for now
    req.body = {
      user_id: 1,
    };
    console.log(req.body);
    const { name, breed, owner, age, sex, size, about, user_id } = req.body;
    console.log(name, breed);
    console.log('I made it here');
    query = {
      text: `INSERT into dogProfiles (owner, name, sex, breed, size, age, about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      values: [owner, name, sex, breed, size, age, user_id, about],
    };
    console.log('Fail before response');
    let response = await db.query(query);
    console.log('Fail after response');
    res.locals.newProfile = response;
    console.log('Fail after locals');
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = dogController;
