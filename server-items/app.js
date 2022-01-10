const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const apiRouter = require("../routers/api.router");
const {
  handleServerErrors,
  handleCustomErrors,
  handlePsqlErrors,
} = require("../errors/errors.js");

app.use(cors());
app.use("/api", apiRouter);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.use("/*", handleCustomErrors);

module.exports = app;
