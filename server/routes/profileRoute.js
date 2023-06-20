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

module.exports = router;