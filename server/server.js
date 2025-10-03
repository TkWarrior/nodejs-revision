const express = require("express");
const db = require("../database/db");
const passport = require("../auth/auth")
const menue = require("../model/menue");

const app = express();
app.use(express.json());

// custom middleware
const logRequest = function (req, res, next) {
  console.log(
    `[${new Date().toLocaleString()}] : Request made to  ${req.originalUrl}`
  );
  next(); // calls next middleware function
};

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local' , {session:false});
app.use(logRequest); // this line tells to use this middleware to all the routes

app.get("/", function (req, res) {
  res.send("hello frontend");
});

const personRouter = require("../router/personRouter");

app.use("/", localAuthMiddleware , personRouter);
const menueRouter = require("../router/menuerouter");
app.use("/", menueRouter);

app.listen(3000, console.log("server listening"));
