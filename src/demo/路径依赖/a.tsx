import React from "react";
import { useField } from "./hooks";
import { FieldContext } from "./context";

export const A = (props) => {
  const parent = useField();
  console.log("parent00", parent);

  return (
    <FieldContext.Provider value={{ name: "a" }}>
      {props.children}
    </FieldContext.Provider>
  );
};
