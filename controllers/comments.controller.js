const { deleteCommentByID } = require("../models/comments.model");

exports.removeCommentByID = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByID(comment_id)
    .then((response) => {
      res.status(204).send(`Comment ${comment_id} successfully deleted!`);
    })
    .catch((err) => {
      next(err);
    });
};
