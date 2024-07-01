const Category = require("../models/categoryModel");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const categoryExist = await Category.findOne({ name });

  const slug = slugify(name).toLowerCase();
  if (categoryExist) {
    return res.status(400).json({ error: `${name} sudah dibuatkan` });
  }

  const saveCategory = new Category({ name, slug });
  await saveCategory
    .save()
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};
