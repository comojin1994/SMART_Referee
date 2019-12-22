import React from "react";
import Add from "./Add";
import List from "./List";
import ToDo from "./ToDo";
import { useState } from "../context";

function App() {
  const { toDos, completed } = useState();
  return (
    <>
      <Add />

      <List name={"To Do"}></List>
      {toDos.map((toDo, index) => (
        <ToDo key={toDo.id} id={toDo.id} text={toDo.text} />
      ))}

      <List name={completed.length !== 0 ? "Completed" : ""}></List>
      <>
        {completed.map((toDo, index) => (
          <ToDo
            key={toDo.id}
            id={toDo.id}
            text={toDo.text}
            isCompleted={true}
          />
        ))}
      </>
    </>
  );
}

export default App;
