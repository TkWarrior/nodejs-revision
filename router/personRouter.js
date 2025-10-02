const express = require("express")
const router = express.Router()
const Person = require("../model/Person")

router.get("/getPerson", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Internal Servor error");
  }
});

router.get("/getPerson/:type", async (req, res) => {
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

router.post("/savePerson", async (req, res) => {
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

router.put("/updatePerson/:id" , async(req , res)=>{
    try {
        const personId = req.params.id ; // extract id from url parameter
        
        const updatedData = req.body ; // send updated person data in the request

        const response = await Person.findByIdAndUpdate(personId , updatedData , {
            new :true , // returun the updated person as a response
            runValidators : true // do mogoose validation
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.delete("/delete/:id" , async(req,res)=>{
    try {
        const personId = req.params.id ; // person to be deleted 
        const response = await Person.findByIdAndDelete(personId) // returns deleted person response
        res.status(200).json({
            message : "Person deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router