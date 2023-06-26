import React from "react";
import { useField } from "./hooks";
import { FieldContext } from "./context";

export const C = (props) => {
  const parent = useField();

  console.log("parent", parent);

  return (
    <FieldContext.Provider value={{ name: "c" }}>
      <div>xx</div>
    </FieldContext.Provider>
  );
};
