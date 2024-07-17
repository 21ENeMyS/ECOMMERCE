const express = require("express");
const router = express.Router();

const {
  createCategory,
  readCategories,
  readOneCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/categoriesController");

router.post("/category/create/", createCategory);
router.get("/category/", readCategories);
router.get("/category/:slug", readOneCategory);
router.delete("/category/:slug/delete", deleteCategory);
router.put("/category/update/:slug", editCategory);

module.exports = router;
