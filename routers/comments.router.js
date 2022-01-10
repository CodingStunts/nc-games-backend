const commentsRouter = require("express").Router();
const {
  removeCommentByID,
  patchCommentByID,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .delete(removeCommentByID)
  .patch(patchCommentByID);

module.exports = commentsRouter;
