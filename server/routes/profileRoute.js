const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');

// Get current matches
router.get('/matches', dogController.getMatches, (req, res) => {
  return res.status(200).send(res.locals.matches);
});

// Get single profile
router.get('/:profileId', dogController.getProfile, (req, res) => {
  return res.status(200).send(res.locals.profile);
});

module.exports = router;
