const express = require("express");
const {createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout, getByName} = require("../Controller/controller")

const router = express.Router();

//PATCH requests are meant for modifying existing resources.
//POST requests are meant for adding new resources

//GET all workouts
router.get("/", getWorkouts);

//GET a single workout
//Colon followed by id denotes a segment in the URL where id could be any value
router.get("/:id", getWorkout);

//POST a new workout. the function is asynchronous
router.post("/", createWorkout);

//DELETE a new workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

//GET a workout by name
router.get("/name/:name", getByName);

module.exports = router;

