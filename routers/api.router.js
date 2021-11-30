const express = require("express");
const app = express();
app.use(express.json());
const categoriesRouter = require("./categories.router");
const usersRouter = require("./users.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

app.router("/", getApi);

module.exports = apiRouter;
