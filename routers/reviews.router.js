const reviewsRouter = require("express").Router();
const {
  getReviewWithID,
  patchReviewVotes,
  getReviews,
  getCommentsByReview,
  postCommentByReview,
} = require("../controllers/reviews.controller");

reviewsRouter
  .route("/:review_id")
  .get(getReviewWithID)
  .patch(patchReviewVotes)
  .post(postCommentByReview);

reviewsRouter.route("/").get(getReviews);

reviewsRouter.route("/:review_id/comments").get(getCommentsByReview);

module.exports = reviewsRouter;
