const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/categoriesController");

router.post("/category/create/", createCategory);

module.exports = router;
