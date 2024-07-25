import {useWorkoutsContext} from "../Hooks/useWorkoutContext";
import {formatDistanceToNow} from "date-fns/formatDistanceToNow";
import {useState} from "react";
import UpdateForm from "./UpdateForm";

const divStyle = {
    "backgroundColor" : "white",
    "width" : "22.5rem",
    "height" : "15.75rem"
};

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext();
    const [showUpdate, setUpdate] = useState(false);

    const handleClick = async () => {
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE"
        });

        const json = await response.json();

        if(response.ok){
            dispatch({type: "DELETE_WORKOUT", payload: json});
        }
    }

    const Details = () => {
        return <>
            <div className = "d-flex justify-content-between z-1">
                <h4> <strong> {workout.title} </strong> </h4>
                <div>
                    <button className="material-symbols-outlined border-0 rounded me-1" onClick = {() => setUpdate(true)}> update </button>
                    <button className="material-symbols-outlined border-0 rounded"  onClick = {handleClick}> delete </button>
                </div>
            </div>

            <p className = "mb-0"> <strong> Load (lb): </strong>{workout.load}</p>
            <p className = "mb-0"> <strong> Reps: </strong>{workout.reps}</p>
            <p >{formatDistanceToNow(new Date(workout.createdAt), {addSuffix : true})}</p>

        </>
    }
    return <>
        <div className = "m-2 p-2 col-auto" style = {divStyle}>
            {showUpdate ? <UpdateForm workout={workout} showUpdate = {showUpdate} setUpdate = {setUpdate}/> : <Details />}
        </div>

    </>;
}

export default WorkoutDetails;