//Mongoose allows us to create models and schemas, mongoDB alone is schemaless
const mongoose = require("mongoose");

//A schema defines the structure of documents in a collection
const Schema = mongoose.Schema;

//This defines the structure of documents in the collection
const workoutSchema = new Schema({
    title : {type : String, required : true},
    reps : {type : Number, required : true},
    load : {type : Number, required : true}
}, {timestamps : true});
//Creates a timestamp when the document was created

//A model applies the schema. Kind of like the database that applies the rules
module.exports = mongoose.model("Workout", workoutSchema);