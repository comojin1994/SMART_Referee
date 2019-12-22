import React from "react";
import { COMPLETE, UNCOMPLETE, DEL } from "../action";
import { useDispatch } from "../context";

export default ({ text, id, isCompleted }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <span>{text} </span>
      <button onClick={() => dispatch({ type: DEL, payload: id })}>
        <span role="img" aria-label="Delete">
          ❌
        </span>
      </button>
      <button
        onClick={() =>
          dispatch({ type: isCompleted ? UNCOMPLETE : COMPLETE, payload: id })
        }
      >
        <span role="img" aria-label="Delete">
          {isCompleted ? "🙅‍♀️" : "✅"}
        </span>
      </button>
    </li>
  );
};
