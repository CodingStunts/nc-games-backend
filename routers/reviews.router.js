const reviewsRouter = require("express").Router();
const {
  getReviewWithID,
  patchReviewVotes,
  getReviews,
} = require("../controllers/reviews.controller");

//GET /reviews/:review_id
reviewsRouter.route("/:review_id").get(getReviewWithID);
//PATCH /reviews/:review_id
reviewsRouter.route("/:review_id").patch(patchReviewVotes);
//GET /reviews
reviewsRouter.route("/").get(getReviews);
//GET /reviews/:review_id/comments
//POST /reviews/:review_id/comments

module.exports = reviewsRouter;
