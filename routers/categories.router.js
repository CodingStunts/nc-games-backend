const express = require("express");
const app = express();
app.use(express.json());

const categoriesRouter = require("express").Router();

//GET /categories

module.exports = categoriesRouter;
