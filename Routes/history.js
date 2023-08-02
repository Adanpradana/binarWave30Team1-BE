const history = require("../Controllers/History.controller");
const authOnly = require("../middlewares/auth");
const Router = require("express").Router();

Router.post("/", authOnly, history.postHistory);
Router.get("/:id", authOnly, history.getHistory);
module.exports = Router;

//notes api - public / private
