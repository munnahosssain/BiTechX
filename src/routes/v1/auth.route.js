const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.controller");

router.route("/sign-up").post(authController.signUp);
router.route("/sign-in").post(authController.signIn);
router.route("/sign-out").get(authController.signOut);
router
  .route("/:id")
  .put(authController.updateUser)
  .get(authController.getUserById)
  .delete(authController.deleteUser);

module.exports = router;
