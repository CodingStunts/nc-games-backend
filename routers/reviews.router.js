const reviewsRouter = require("express").Router();
const {
  getReviewWithID,
  patchReviewVotes,
  getReviews,
  getCommentsByReview,
  postCommentByReview,
} = require("../controllers/reviews.controller");

reviewsRouter.route("/:review_id").get(getReviewWithID);

reviewsRouter.route("/:review_id").patch(patchReviewVotes);

reviewsRouter.route("/").get(getReviews);

reviewsRouter.route("/:review_id/comments").get(getCommentsByReview);

reviewsRouter.route("/:review_id/").post(postCommentByReview);

module.exports = reviewsRouter;
