const db = require("../db/connection");
const categories = require("../db/data/test-data/categories");

exports.selectReviewWithID = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((result) => {
      const review = result.rows;
      return review;
    });
};
