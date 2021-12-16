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
