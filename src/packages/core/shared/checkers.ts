import { Form, VoidField } from "../models";

export const isForm = (node: any): node is Form => {
  return node instanceof Form;
};

export const isVoidField = (node: any): node is VoidField => {
  return node instanceof VoidField;
};
