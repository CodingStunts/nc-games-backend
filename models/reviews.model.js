const db = require("../db/connection");
const categories = require("../db/data/test-data/categories");
const reviews = require("../db/data/test-data/reviews");

exports.selectReviewWithID = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((result) => {
      const review = result.rows;
      const secondQuery = db.query(
        "SELECT * FROM comments WHERE review_id = $1;",
        [review_id]
      );
      return Promise.all([secondQuery, review[0]]);
    })
    .then((results) => {
      const commentsCount = results[0].rowCount;
      const reviewRes = results[1];
      reviewRes.comment_count = commentsCount;
      // console.log(reviewRes);
      return reviewRes;
    });
};
exports.updateReviewVotes = (review_id, votes) => {
  return db
    .query("UPDATE reviews SET votes = votes + $1 WHERE review_id = $2;", [
      votes,
      review_id,
    ])
    .then(() => {
      return db.query("SELECT * FROM reviews WHERE review_id = $1;", [
        review_id,
      ]);
    })
    .then((result) => {
      return result.rows[0];
    });
};

exports.selectReviews = (queryData) => {
  console.log(queryData);
  return db
    .query(
      `SELECT reviews.*,
    COUNT(comments.review_id) AS comment_count
    FROM reviews LEFT JOIN comments ON comments.review_id =
    reviews.review_id GROUP BY reviews.review_id;`
    )
    .then((results) => {
      const reviews = results.rows;
      return reviews;
    });
};
