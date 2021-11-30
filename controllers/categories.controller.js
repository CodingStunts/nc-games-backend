const { selectCategories } = require("../models/categories.model");

exports.getCategories = (req, res, next) => {
  const { body } = req;
  selectCategories(body)
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      next(err);
    });
};
