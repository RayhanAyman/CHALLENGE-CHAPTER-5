const express = require("express");
const route = express.Router();
const controller = require("../controller/controller");


route.get("/", (req, res) => {
     res.render("index");
});

route.get("/game", (req, res) => {
     res.render("game");
});

route.get("/api/users", controller.getAll);
route.get("/api/users/:id", controller.show);
route.post("/api/users", controller.create);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;