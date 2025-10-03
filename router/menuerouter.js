const express = require("express");
const router = express.Router()
const menue = require("../model/menue")

router.get("/menue", async (req, res) => {
  try {
    const data = await menue.find();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in fetching data");
    return res.status(500).json("Internal Server error");
  }
});

router.get("/menue/:variety", async(req,res)=>{
  try {
    const variety = req.params.variety;
    
    if(variety=="veg" || variety =="non-veg"){
      const data = await menue.find({variety : variety});
      res.status(200).json(data)
    }else{
      res.status(404).json("invalid data type")
    }
  } catch (error) {
    console.error("unable to fetched the data");
    res.status(500).json("Internal server error")
  }
})

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

module.exports = router