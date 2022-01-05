const { selectUsers, selectUserByID } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  const { query } = req.query;
  selectUsers(query)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByID = (req, res, next) => {
  const { username } = req.params;
  selectUserByID(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
