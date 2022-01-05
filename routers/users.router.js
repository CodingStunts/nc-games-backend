const usersRouter = require("express").Router();
const { getUsers, getUserByID } = require("../controllers/users.controller");

usersRouter.route("/").get(getUsers);

usersRouter.route("/:username").get(getUserByID);

module.exports = usersRouter;
