const mongoose = require("mongoose")
 
const {Schema  , model} = mongoose;

const menueSchema = new Schema({
    name : {
        type: String,
        require : true
    },
   
    variety : {
        type: String , 
        enum : ["veg" , "non-veg"],
        require : true
    } 

})

const menue = model("menue" , menueSchema)

module.exports = menue