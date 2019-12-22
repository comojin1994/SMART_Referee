import React from "react";
import Header from "./Header";
import { useFunction } from "./context";

const Screen = () => {
  const { logUserIn } = useFunction();
  return (
    <div>
      <Header />
      <h1>First Screen</h1>
      <button onClick={logUserIn}>User Login</button>
    </div>
  );
};

export default Screen;
