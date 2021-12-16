const reviewsRouter = require("express").Router();
const {
  getReviewWithID,
  patchReviewVotes,
  getReviews,
  getCommentsByReview,
  postCommentByReview,
} = require("../controllers/reviews.controller");

reviewsRouter.route("/:review_id").get(getReviewWithID).patch(patchReviewVotes);

reviewsRouter.route("/").get(getReviews);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReview)
  .post(postCommentByReview);

module.exports = reviewsRouter;
