const mongoose = require("mongoose");

const Category = new mongoose.model(
  "Category",
  mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true,
      },

      slug: {
        type: String,
        unique: true,
        index: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Category;
