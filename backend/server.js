require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./Routes/workouts");

//Express app
const app = express();

//Sets up middleware for when an endpoint is reached. Next() passes control to the next
//middleware function in the stack
app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
})

//Middleware, checks to see if there is data sent to the server and allows us to access it
app.use(express.json());


//Get request for localhost:4000/"
//Request and response object
// app.get('/', (req, res) => {
//     //Sends back a JSON string
//     res.json({mssg: "Welcome to the app"})
// })

//Only fires these routes when we access this path.
app.use("/api/workouts", workoutRoutes);

//Connects to mongoose
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //Listen for requests after mongoDB has been connected. When it's done, it fires a message
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and listening on port", process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error)
    });


