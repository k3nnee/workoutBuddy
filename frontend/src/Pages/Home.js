import {useEffect} from "react";
import {useWorkoutsContext} from "../Hooks/useWorkoutContext";

import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";

const Home = () =>{
    const {workouts, dispatch} = useWorkoutsContext();
    //This causes something to occur when the component has been rendered.
    //The empty array means that the effect will occur once
    useEffect(() => {
        const fetchWorkouts = async () => {
            //Returns a response object
            //By default, cross-origin are blocked, so to work around this,
            //we use proxy which directs unknown requests to specified link
            const response = await fetch("/api/workouts");
            //Grabs the json from the object
            const json = await response.json();

            //If the response is good, set the state of the workouts to the json
            if(response.ok){
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }

        fetchWorkouts().then( () => console.log("completed") );
    }, [dispatch])
    return <>
        <div className = "col m-5">
            <div className = "row">
                <div className = "col-6 col-md-3 pe-3">
                    <WorkoutForm />

                </div>
                <div className = "col col-9">
                    <div className = "justify-content-center justify-content-lg-start  row">
                        {workouts && workouts.map((workout) =>
                            <WorkoutDetails key = {workout.id} workout = {workout}></WorkoutDetails>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Home;