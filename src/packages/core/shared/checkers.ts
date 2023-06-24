import { Form } from "../models";

export const isForm = (node: any): node is Form => {
  return node instanceof Form;
};
