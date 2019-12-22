import React, { useState, useContext } from "react";
import { useDispatch } from "../context";
import { ADD } from "../action";

export default () => {
  const [newToDo, setNewToDo] = useState("");
  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    dispatch({ type: ADD, payload: newToDo });
    setNewToDo("");
  };

  const onChange = event => {
    const {
      target: { value }
    } = event;

    setNewToDo(value);
  };

  return (
    <>
      <h1>Add to do</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Write to do"
          value={newToDo}
          onChange={onChange}
        />
      </form>
    </>
  );
};
