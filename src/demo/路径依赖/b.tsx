import React from "react";
import { useField } from "./hooks";
import { FieldContext } from "./context";

export const B = (props) => {
  const parent = useField();
  console.log("parentb", parent);

  return (
    <FieldContext.Provider value={{ name: "b" }}>
      {props.children}
    </FieldContext.Provider>
  );
};
