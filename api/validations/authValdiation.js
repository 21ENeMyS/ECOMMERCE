const { check } = require("express-validator");

exports.signupValidation = [
  check("name").trim().notEmpty().withMessage("nama harus diisi"),
  check("email").isEmail().withMessage("harus alamat email yang valid"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Passwrod tidak boleh kurang dari 8 karakter atau 8 huruf"),
];

exports.signinValidation = [
  check("email").isEmail().withMessage("alamat email harus valid"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Passwrod tidak boleh kurang dari 8 karakter atau 8 huruf"),
];
