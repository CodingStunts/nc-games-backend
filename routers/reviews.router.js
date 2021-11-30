const express = require("express");
const app = express();
app.use(express.json());
const reviewsRouter = require("express").Router();

//GET /reviews/:review_id
//PATCH /reviews/:review_id
//GET /reviews
//GET /reviews/:review_id/comments
//POST /reviews/:review_id/comments

module.exports = reviewsRouter;
