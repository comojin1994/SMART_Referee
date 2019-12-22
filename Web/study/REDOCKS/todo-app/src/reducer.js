import uuid from "uuid/v4";
import { ADD, DEL, COMPLETE, UNCOMPLETE } from "./action";

export const initialState = {
  toDos: [],
  completed: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        toDos: [...state.toDos, { text: action.payload, id: uuid() }]
      };
    case DEL:
      return {
        ...state,
        toDos: state.toDos.filter(toDo => toDo.id !== action.payload)
      };
    case COMPLETE:
      const completeTarget = state.toDos.find(
        toDo => toDo.id === action.payload
      );
      return {
        ...state,
        toDos: state.toDos.filter(toDo => toDo.id !== action.payload),
        completed: [...state.completed, { ...completeTarget }]
      };
    case UNCOMPLETE:
      const uncompleteTarget = state.completed.find(
        toDo => toDo.id === action.payload
      );
      return {
        ...state,
        completed: state.completed.filter(toDo => toDo.id !== action.payload),
        toDos: [...state.toDos, { ...uncompleteTarget }]
      };
    default:
      return;
  }
};

export default reducer;
