import {useState} from "react";
import {useWorkoutsContext} from "../Hooks/useWorkoutContext";

const UpdateForm = ({workout, setUpdate, showUpdate}) => {
    const [title, setTitle] = useState(workout.title);
    const [reps, setReps] = useState(workout.reps);
    const [load, setLoad] = useState(workout.load);

    const {dispatch} = useWorkoutsContext();

    const handleClick = async (e) => {
        e.preventDefault();

        const updateString = {title, reps, load};

        const response = await fetch("/api/workouts/" + workout._id, {
            method : "PATCH", body : JSON.stringify(updateString),
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const json = await response.json();

        if(!response.ok){
            console.log("Error")
        }else{
            setTitle(workout.title);
            setReps(workout.reps);
            setLoad(workout.load);

            dispatch({type : "UPDATE_WORKOUT", payload : {...updateString, createdAt : json.createdAt, _id : json._id}});
            console.log("Workout updated");

            setUpdate(!showUpdate);
        }
    }

    return (
        <>
            <div >
                <div className = "p-2">
                    <form>
                        <div className = "form-group">
                            <label> Exercise title </label>
                            <input className = "form-control" id = "title" type = "text" onChange = {(e) => {
                                setTitle(e.target.value);
                            }} placeholder = {title}></input>
                        </div>

                        <div className = "form-group">
                            <label> Load (lbs) </label>
                            <input className = "form-control" id = "load" type = "text" onChange = {(e) => {
                                setLoad(e.target.value);
                            }} placeholder = {load}></input>
                        </div>

                        <div className = "form-group">
                            <label> Reps </label>
                            <input className = "form-control" id = "reps" type = "text" onChange = {(e) => {
                                setReps(e.target.value);
                            }} placeholder = {reps}></input>
                        </div>

                        <div>
                            <button className="material-symbols-outlined border-0 rounded me-2 mt-2"  onClick = {handleClick}> check </button>
                            <button className="material-symbols-outlined border-0 rounded"  onClick = {(e) => {
                                e.preventDefault()
                                setUpdate(!showUpdate)}}> close </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateForm;