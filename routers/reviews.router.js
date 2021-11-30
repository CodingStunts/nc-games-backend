const reviewsRouter = require("express").Router();
const { getReviewWithID } = require("../controllers/reviews.controller");

//GET /reviews/:review_id
reviewsRouter.route("/:review_id").get(getReviewWithID);
//PATCH /reviews/:review_id
//GET /reviews
//GET /reviews/:review_id/comments
//POST /reviews/:review_id/comments

module.exports = reviewsRouter;
