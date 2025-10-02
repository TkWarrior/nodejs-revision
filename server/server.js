const express = require("express");
const db = require("../database/db");
const Person = require("../model/Person");
const menue = require("../model/menue");

const app = express();
app.use(express.json());
app.get("/", function (req, res) {
  res.send("hello frontend");
});
const personRouter = require("../router/personRouter");
app.use("/" , personRouter)
const menueRouter = require("../router/menuerouter");
app.use("/" , menueRouter)

app.listen(3000, console.log("server listening"));
