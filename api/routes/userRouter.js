const express = require("express");
const router = express.Router();

const { Signup, Signin } = require("../controllers/userController");
const { runValidationResult } = require("../validations/");
const {
  signupValidation,
  signinValidation,
} = require("../validations/authValdiation");

//! penempatan signupvalidation atau signinvalidation tidak boleh salah
// berikan validasi ketika user menginputkan
router.post("/signup", signupValidation, runValidationResult, Signup);
router.post("/signin", signinValidation, runValidationResult, Signin);

module.exports = router;
