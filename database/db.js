const mongoose = require("mongoose")
const env = require("dotenv").config()
// Set up the mongo db connection
const dbUrl = process.env.DATABASE_URL
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// mongoose maintains the deafult connection object representing the coonection object
const db  = mongoose.connection;

// event listener 
// There are different kind of events like connected , disconnected  , error mongodb already understood these keywords
// At each event listener we've have printed the logs
db.on("connected" , () => {
    console.log("MongoDB connected")
})

db.on("disconected", () => {
  console.log("MongoDB disconnected");
});

db.on("error" , (err)=>{
    console.log("error connecting to database" , err)
})

// export the database connection
module.exports = db