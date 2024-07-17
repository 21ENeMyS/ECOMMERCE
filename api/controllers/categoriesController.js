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

exports.readCategories = async (req, res) => {
  await Category.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

exports.readOneCategory = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  await Category.findOne({ slug })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

exports.deleteCategory = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  await Category.findOneAndDelete({ slug })
    .then((result) => {
      return res.status(201).json({ message: `${slug} berhasil dihapus` });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};

exports.editCategory = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const { name } = req.body;
  try {
    const updateCategory = await Category.findOneAndUpdate(
      { slug },
      {
        $set: {
          name: name,
          slug: slugify(name).toLowerCase(),
        },
      },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(404).json({ message: `Maaf kategori tidak ditemukan` });
    }

    return res.status(200).json(updateCategory);
  } catch (error) {
    return res.status(500).json(error);
  }
};
