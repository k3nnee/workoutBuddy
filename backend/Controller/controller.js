const Workout = require("../Models/Workouts")
const mongoose = require("mongoose");

//GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({createdAt : -1});
    res.status(200).json(workouts);
};

//GET one workout
const getWorkout = async (req, res) => {
    const {id} = req.params;

    //The id that we use is a object in Mongoose, this checks to see if it is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"});
    }

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404);
    }

    res.status(200).json(workout);
}

//CREATE workout. The function is asynchronous
const createWorkout = async (req, res) => {
    //This line of code uses destructuring
    //Adding doc to DB
    try{
        //This line of code uses short handing to name the values of the JSON
        const workout = await Workout.create({...req.body});

        res.status(200).json(workout);
    }catch(error){
        return res.status(400);
    }
};
//DELETE workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"});
    }

    const workout = await Workout.findOneAndDelete({_id : id});

    if(!workout){
        return res.status(404).json({error : "No such workout"});
    }

    res.status(200).json(workout);

}
//UPDATE workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"});
    }

    const workout = await Workout.findOneAndUpdate({_id : id}, {
        //Req.body is an object
       ...req.body
    })

    if(!workout){
        return res.status(404).json({error : "No such workout"});
    }

    res.status(200).json(workout);
}

const getByName = async (req, res) => {
    const {name} = req.params;
    const workout = await Workout.find({"title" : name});

    if(!workout){
        return res.status(404).json({error: "No workout found by name"});
    }

    res.status(200).json(workout);
}
module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout,
    getByName
}