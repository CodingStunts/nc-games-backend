const categoriesRouter = require("express").Router();
const { getCategories } = require("../controllers/categories.controller");

categoriesRouter.route("/").get(getCategories);
//GET /categories

module.exports = categoriesRouter;
