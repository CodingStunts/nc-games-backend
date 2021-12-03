const endpoints = require("../endpoints.json");

exports.getEndpoints = (req, res, next) => {
  return Promise.resolve(endpoints)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
