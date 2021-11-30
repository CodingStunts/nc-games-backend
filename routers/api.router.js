const express = require("express");
const categoriesRouter = require("./categories.router");
const usersRouter = require("./users.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
