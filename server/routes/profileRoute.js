const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dogController");
const userController = require("../controllers/userController");

// Get current matches
router.get(
  "/matches/:profileId",
  userController.isLoggedIn,
  dogController.hasProfile,
  dogController.getMatches,
  (req, res) => {
    return res.status(200).send(res.locals.matches);
  },
);

// Get all potential likes
router.get(
  "/dogs",
  userController.isLoggedIn,
  dogController.getLoggedInUsersDogProfileId,
  dogController.getAllSwipes,
  dogController.getAllDogs,
  (req, res) => {
    return res.status(200).send(res.locals.listOfDogs);
  },
);

router.get(
  "/profiles",
  userController.isLoggedIn,
  dogController.getProfiles,
  (req, res) => {
    return res.status(200).send(res.locals.profile);
  },
);

router.post(
  "/swipe",
  userController.isLoggedIn,
  dogController.getLoggedInUsersDogProfileId,
  dogController.addSwipe,
  dogController.checkForMatch,
  (req, res) => {
    if (res.locals.matchFound)
      return res.status(200).send("A match was found!");
    else return res.status(200).send("No match");
  },
);

// Get single profile
router.get("/:profileId", dogController.getProfile, (req, res) => {
  return res.status(200).send(res.locals.profile);
});

// Create new dog profile
router.post(
  "/create",
  userController.isLoggedIn,
  dogController.getProfileById,
  dogController.createProfile,
  dogController.updateProfile,
  (req, res) => {
    return res.status(200).send(res.locals.newProfile);
  },
);

// router.put('/create', userController.isLoggedIn, dogController.updateProfile, (req, res) => {
//   return res.status(200).send(res.locals.newProfile);
// });

router.put(
  "/matches/:profileId",
  dogController.removeMatch,
  dogController.updateLikes,
  dogController.getMatches,
  (req, res) => {
    return res.status(200).send(res.locals.matches);
  },
);

module.exports = router;
