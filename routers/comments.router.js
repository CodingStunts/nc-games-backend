const commentsRouter = require("express").Router();
const { removeCommentByID } = require("../controllers/comments.controller");

commentsRouter.route("/:comment_id").delete(removeCommentByID);

//then after all first complete:
//PATCH /comments/:comment_id

module.exports = commentsRouter;
