const db = require("../db/connection");

exports.deleteCommentByID = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING*;`, [
      comment_id,
    ])
    .then((result) => {
      deletedComment = result.rows;
      if (deletedComment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `There doesn't seem to be a comment with ID ${comment_id}!`,
        });
      }
      return { deletedComment };
    });
};

exports.updateCommentByID = (comment_id, votes) => {
  if (typeof votes !== "number" && votes !== undefined) {
    return Promise.reject({
      status: 400,
      msg: `The inc_votes value: '${votes}' is not a valid input!`,
    });
  }
  let newVotes = votes;
  if (votes === undefined) newVotes = 0;
  return db
    .query(
      `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING*`,
      [newVotes, comment_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No review found with the comment_id: ${comment_id}`,
        });
      }
      return result.rows;
    });
};
