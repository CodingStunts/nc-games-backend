const express = require("express");
const app = express();
app.use(express.json());
const commentsRouter = require("express").Router();

//DELETE /comments/:comment_id
//then after all first complete:
//PATCH /comments/:comment_id

module.exports = commentsRouter;
