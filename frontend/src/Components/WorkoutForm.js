import {useState} from "react";
import {useWorkoutsContext} from "../Hooks/useWorkoutContext";

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState("");

    const {dispatch} = useWorkoutsContext();

    const handleSubmit = async (e) => {
        //Prevents refreshing
        e.preventDefault();
        const workout = {title, load, reps};

        console.log(JSON.stringify(workout));

        //Fetch returns a response object
        const response = await fetch("/api/workouts", {
            method : "POST", body : JSON.stringify(workout),
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }else{
            setLoad("");
            setReps("");
            setTitle("");
            setError(false);

            dispatch({type: "CREATE_WORKOUT", payload: json});
            console.log("New workout added", json)
        }
    }
    return <>
        <form>
            <h3> Add a new Workout </h3>
            <div className = "form-group">
                <label htmlFor = "title"> Exercise Title </label>
                <input className = "form-control" id = "title" type = "text" onChange={(e) => {
                    setTitle(e.target.value)
                }} >
                </input>
            </div>

            <div className = "form-group">
                <label htmlFor = "load" > Load (lbs) </label>
                <input className = "form-control" id = "load" type = "number" onChange={(e) => {
                    setLoad(e.target.value)
                }} >
                </input>
            </div>

            <div className = "form-group">
                <label htmlFor = "reps"> Reps </label>
                <input className = "form-control" id = "reps" type = "number" onChange={(e) => {
                    setReps(e.target.value)
                }} >
                </input>
            </div>

            <button className = "mt-2 btn btn-outline-secondary" onClick = {handleSubmit}> Add Workout </button>
            {
                error && <div> {error} </div>
            }

        </form>
    </>
}

export default WorkoutForm;