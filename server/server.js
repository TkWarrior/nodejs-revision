const express = require("express");
const db = require("../database/db");
const Person = require("../model/Person");
const menue = require("../model/menue");

const app = express();
app.use(express.json());
app.get("/", function (req, res) {
  res.send("hello frontend");
});

app.get("/getPerson", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Internal Servor error");
  }
});

app.get("/getPerson/:type", async (req, res) => {
  try {
    const type = req.params.type; // extracting type from the URL paramater
    // validation check
    if (type == "introvert" || type == "extrovert" || type == "ambivert") {
      const data = await Person.find({ personality: type });
      console.log(data);
      res.status(200).json(data);
    } else {
      res.status(404).json("Invalid data");
    }
  } catch (error) {
     return res.status(500).json("Internal server eror")
  }
});

app.get("/menue", async (req, res) => {
  try {
    const data = await menue.find();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in fetching data");
    return res.status(500).json("Internal Server error");
  }
});

app.post("/menue", async (req, res) => {
  try {
    const data = await req.body;
    const newMenue = new menue(data);
    console.log(newMenue);
    const response = newMenue.save();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json("Internal Server error");
  }
});
app.post("/save", async (req, res) => {
  try {
    const data = req.body; // Request body will contain Person's data

    // create the new person document using the mongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(3000, console.log("server listening"));
