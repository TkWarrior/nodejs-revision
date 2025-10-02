const mongoose = require('mongoose');

const { Schema } = mongoose;

const PersonSchema = new Schema ({
    name : {
        type : String , 
        require : true
    },

    email : {
        type : String , 
        unique : true , 
        require : true
    } , 

    address : {
        type : String , 
    },

    contact : {
        type : Number,
        require : true
    },
    personality : {
        type : String,
        enum : ["introvert" , "extrovert" ]
    }
}
)

const Person = mongoose.model('Person' , PersonSchema)

module.exports = Person 