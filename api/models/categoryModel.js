const mongoose = require("mongoose");
const slugify = require("slugify");

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

// Category.virtual("slug").get(function (next) {
//   return slugify(this.name, { lower: true });
//   next();
// });

module.exports = Category;
