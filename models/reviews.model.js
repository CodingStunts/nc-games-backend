const db = require("../db/connection");
const categories = require("../db/data/test-data/categories");
const comments = require("../db/data/test-data/comments");
const reviews = require("../db/data/test-data/reviews");

//Looking to refactor as a single complex query, as per below.
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
      const reviewRes = results[1];
      if (!reviewRes) {
        return Promise.reject({
          status: 404,
          msg: `No review found with review_id: ${review_id}`,
        });
      }
      const commentsCount = results[0].rowCount;
      reviewRes.comment_count = commentsCount;
      return reviewRes;
    });
};
//Refactoring to RETURN*
exports.updateReviewVotes = (review_id, votes) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No review found for with review_id: ${review_id}`,
        });
      }
      return db
        .query(
          "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING*;",
          [votes, review_id]
        )
        .then((result) => {
          return result.rows[0];
        });
    });
};

exports.selectReviews = (queryData) => {
  let { sort_by, order, category } = queryData;
  let queryString = `SELECT reviews.*,
  COUNT(comments.review_id) AS comment_count
  FROM reviews LEFT JOIN comments ON comments.review_id =
  reviews.review_id`;

  if (category !== undefined) {
    let newCategory = category.replace(/_/g, " ");
    queryString += ` WHERE category = '${newCategory}'`;
  }

  if (order === undefined) order = "DESC";
  if (sort_by === undefined) sort_by = "created_at";
  queryString += ` GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`;

  return db.query(queryString).then((results) => {
    const reviews = results.rows;
    return reviews;
  });
};

exports.selectCommentsByReview = (review_id) => {
  return db
    .query(`SELECT * FROM comments WHERE review_id = $1;`, [review_id])
    .then((results) => {
      const comments = results.rows;
      return comments;
    });
};

exports.insertCommentByReview = (body, review_id) => {
  const { username, comment } = body;

  return db
    .query(
      `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING*;`,
      [review_id, username, comment]
    )
    .then((results) => {
      const comment = results.rows;
      return comment;
    });
};
