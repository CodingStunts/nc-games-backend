const {
  deleteCommentByID,
  updateCommentByID,
} = require("../models/comments.model");

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

exports.patchCommentByID = (req, res, next) => {
  const { comment_id } = req.params;
  const votes = req.body.inc_votes;
  updateCommentByID(comment_id, votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
