const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../controllers/users");
const router = express.Router();
const { schemaRegister, schemaLogin } = require("../../models/user");
const { validateRequest } = require("../../middlewares/validateRequest");
const { auth, validateToken, validateId } = require("../../middlewares");

router.post("/signup", validateRequest(schemaRegister), registerUser);
router.post("/login", validateRequest(schemaLogin), loginUser);
router.post("/logout", auth, logoutUser);
router.get("/current", auth);

module.exports = router;
