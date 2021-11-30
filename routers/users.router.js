const express = require("express");
const app = express();
app.use(express.json());

const usersRouter = require("express").Router();

//after main first endpoints:
// GET /users
// GET /users/:username

module.exports = usersRouter;
