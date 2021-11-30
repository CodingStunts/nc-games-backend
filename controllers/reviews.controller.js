const { selectReviewWithID } = require("../models/reviews.model");

exports.getReviewWithID = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewWithID(review_id)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      next(err);
    });
};
