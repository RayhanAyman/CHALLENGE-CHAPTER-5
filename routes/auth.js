const express = require("express");
const session = require("express-session");
const router = express.Router();
const fs = require("fs");
const controller = require("../controller/controller");


router.use(express.json());

function authenticate(req, res, next) {
     const fileBuffer = fs.readFileSync("./database/users.json", "utf-8");
     const users = JSON.parse(fileBuffer);
     const { email, password } = req.body;
     const user = users.find((i) => i.email === email);

     if (email && password && user) {
     console.log(user);

     req.session.authenticated = true;
     req.session.isLoggedIn = true;
     return next();
     }

     res.redirect("/game");
}

router.use((req, res, next) => {
     console.log("router level middleware");
     next();
});

router.get("/register", (req, res) => {
     res.render("register");
});

router.post("/register", controller.create);

router.get("/login", (req, res) => {
     res.render("login");
});

router.post("/login", authenticate, (req, res) => {
     res.redirect("/game");
});

module.exports = router;


