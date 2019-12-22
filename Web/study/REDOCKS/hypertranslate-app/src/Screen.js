import React from "react";
import { useSetLang, useHyperTranslate } from "./context";

export default () => {
  const setLang = useSetLang();
  const hyperTranslate = useHyperTranslate();
  return (
    <>
      <h1>{hyperTranslate("Translate")}</h1>
      <button onClick={() => setLang("es")}>Translate</button>
    </>
  );
};
