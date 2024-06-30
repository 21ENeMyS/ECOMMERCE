const User = require("../models/usersModel");
const shortId = require("shortid");

exports.Signup = (req, res) => {
  //input data user
  const { name, email, password } = req.body;
  // generate username
  let username = shortId.generate();
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;
  // tampilkan username
  // tambahkan kedalam database
  let newUser = new User({ name, email, password, username, profile });
  newUser
    .save()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};
