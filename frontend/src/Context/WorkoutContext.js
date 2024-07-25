import {createContext, useReducer} from "react";

export const WorkoutContext = createContext();

//Named export vs export default
//Only one export default is allowed per file
//Named exports when imported need curly braces

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return { workouts: action.payload }
        case "CREATE_WORKOUT":
            return { workouts : [action.payload, ...state.workouts]}
        case "DELETE_WORKOUT":
            return { workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)}
        case "UPDATE_WORKOUT":
            return {workouts: [...state.workouts.filter((workout) => workout._id !== action.payload._id), action.payload]}
        default:
            return state;
    };
}

export const WorkoutContextProvider = ({children}) => {
    //useReducer has a state which changes based on the dispatch type
    //The method passed through should set the state based on the dispatch type
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts : null
    });



    return (
        <WorkoutContext.Provider value = {{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )

}