exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err.msg);
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(400).send("Invalid input!");
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error!" });
};
