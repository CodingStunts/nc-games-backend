const {
  selectReviewWithID,
  updateReviewVotes,
  selectReviews,
} = require("../models/reviews.model");

exports.getReviewWithID = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewWithID(review_id)
    .then((review) => {
      // console.log(review);
      res.status(200).send(review);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const votes = req.body.inc_votes;
  updateReviewVotes(review_id, votes)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const queryData = req.query;
  selectReviews(queryData)
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      next(err);
    });
};
