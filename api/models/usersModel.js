const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { objectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    profile: {
      type: String,
      required: true,
    },
    resetPasswordLink: {
      data: String,
    },
    phoneNumber: {
      type: Number,
    },
    dateOfBirth: {
      type: Date,
    },
    // address: [
    //   {
    //     type: objectId,
    //     ref: "Address",
    //   },
    // ],
  },
  { timestamps: true }
);

// melakukan enkripsi password

userSchema

  .virtual("password")
  // membuat variabel password
  .set(function (password) {
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();

    // enkripsi password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return new Promise((resolve, reject) => {
      /**
       * menkomper password atau mebandingkan password yang di inputkan oleh user apakah sama dengan yang ada di database ?
       *
       */
      bcrypt.compare(plainText, this.hashed_password, (err, isMatch) => {
        if (err) reject(err);
        // jika sama maka masuk
        resolve(isMatch);
      });
    });
  },

  //enkripsi password

  encryptPassword: function (password) {
    // jika password tidak di isi
    if (!password) return "";
    try {
      // password akan di enkripsi ke dalam database
      const salt = bcrypt.genSaltSync(10);
      // terjadi hash dalam password
      return bcrypt.hashSync(password, salt);
    } catch (error) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + "");
  },
};

module.exports = mongoose.model("User", userSchema);
