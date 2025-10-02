const express = require("express");
const router = express.router()

router.get("/menue", async (req, res) => {
  try {
    const data = await menue.find();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in fetching data");
    return res.status(500).json("Internal Server error");
  }
});

router.post("/menue", async (req, res) => {
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