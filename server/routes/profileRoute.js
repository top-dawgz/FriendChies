const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');

// Get current matches
router.get('/matches', dogController.getMatches, (req, res) => {
  return res.status(200).send(res.locals.matches);
});

// Get all profiles
router.get('/dogs', dogController.getAllDogs, (req, res) => {
  return res.status(200).send(res.locals.listOfDogs);
});

router.post(
  '/swipe',
  dogController.addSwipe,
  dogController.checkForMatch,
  (req, res) => {
    if (res.locals.matchFound) return res.status(200).send('A match was found!');
    else return res.status(200).send('No match');
  }
);

module.exports = router;
