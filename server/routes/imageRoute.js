const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const userController = require("../controllers/userController");

router.get(
  "/",
  userController.isLoggedIn,
  imageController.getAllUserImages,
  (req, res) => {
    res.status(200).send(res.locals.images);
  },
);

router.post(
  "/",
  userController.isLoggedIn,
  imageController.postImage,
  (req, res) => {
    res.status(200).send(res.locals.messages);
  },
);

module.exports = router;
