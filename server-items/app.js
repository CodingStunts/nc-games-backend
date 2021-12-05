const express = require("express");
const app = express();
app.use(express.json());
const apiRouter = require("../routers/api.router");
const {
  handleServerErrors,
  handleCustomErrors,
  handlePsqlErrors,
} = require("../errors/errors.js");

app.use("/api", apiRouter);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.use("/*", handleCustomErrors);

/* (err, req, res, next) => {
  if (!app)
    res.status(404).send({ msg: "Not a valid request! Input incorrect.", err });
};
 */
module.exports = app;

//app > api router > comments router > comments contr > comments model, invokes db > controller and send
