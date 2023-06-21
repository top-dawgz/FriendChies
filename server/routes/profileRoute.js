const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');
const userController = require("../controllers/userController");

// Get current matches
router.get('/matches/:profileId', dogController.getMatches, (req, res) => {
  return res.status(200).send(res.locals.matches);
});

// Get all profiles
router.get('/dogs', dogController.getAllDogs, (req, res) => {
  return res.status(200).send(res.locals.listOfDogs);
});

router.post(
  '/swipe',
  // userController.getLoggedInUserData,
  dogController.addSwipe,
  dogController.checkForMatch,
  (req, res) => {
    if (res.locals.matchFound)
      return res.status(200).send('A match was found!');
    else return res.status(200).send('No match');
  }
);

// Get single profile
router.get('/:profileId', dogController.getProfile, (req, res) => {
  return res.status(200).send(res.locals.profile);
});

// Create new dog profile
router.post('/create', dogController.createProfile, (req, res) => {
  return res.status(200).send(res.locals.newProfile);
});

router.put('/matches/:profileId', dogController.removeMatch, dogController.updateLikes, dogController.getMatches, (req,res) => {
  return res.status(200).send(res.locals.matches);
})

module.exports = router;
