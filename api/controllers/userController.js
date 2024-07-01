const User = require("../models/usersModel");
const shortId = require("shortid");
const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res) => {
  //input data user
  const { name, email, password } = req.body;
  const emailExist = await User.findOne({ email: email.toLowerCase() });
  if (emailExist) {
    return res.status(400).json({
      error: `${email} sudah pernah dibuatkan,coba cari nama alamat email lain`,
    });
  }
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

exports.Signin = async (req, res) => {
  // input email dan password
  const { email, password } = req.body;

  try {
    // menacari email di dalam database
    const userExist = await User.findOne({ email: email.toLowerCase() });
    // cek email,apakah email ada dalam database
    if (!userExist) {
      return res.status(400).json({
        error: `${email} yang anda masukan tidak terdaftar,coba daftarkan terlebih dahulu`,
      });
    }

    // cek password yang dimasukan oleh user apakah sama dengan ada yang di database
    if (!userExist.authenticate(password)) {
      return res
        .status(400)
        .json({ message: `Email atau Password tidak valid,coba cek ulang` });
    }
    // berikan jsonwebtoken dan berikan expire selama 1 hari
    const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // beri cookie
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, role } = userExist;
    return res
      .status(200)
      .json({ token, user: _id, username, name, email, role });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Maaf email dan password salah silahkan cek kembali` });
  }
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
