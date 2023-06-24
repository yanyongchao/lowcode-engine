import { Form, LifeCycle } from "./models";

export type FormPatternTypes =
  | "editable"
  | "readOnly"
  | "disabled"
  | "readPretty"
  | ({} & string);
export type FormDisplayTypes = "none" | "hidden" | "visible" | ({} & string);

export type AnyFunction = (...args: any[]) => any;

export type LifeCycleHandler<T> = (payload: T, context: any) => void;

export type LifeCyclePayload<T> = (
  params: {
    type: string;
    payload: T;
  },
  context: any
) => void;

export enum LifeCycleTypes {
  /**
   * Form LifeCycle
   **/

  ON_FORM_INIT = "onFormInit",
  ON_FORM_MOUNT = "onFormMount",
  ON_FORM_UNMOUNT = "onFormUnmount",
  ON_FORM_SUBMIT = "onFormSubmit",
  ON_FORM_RESET = "onFormReset",
  ON_FORM_SUBMIT_START = "onFormSubmitStart",
  ON_FORM_SUBMITTING = "onFormSubmitting",
  ON_FORM_SUBMIT_END = "onFormSubmitEnd",
  ON_FORM_SUBMIT_VALIDATE_START = "onFormSubmitValidateStart",
  ON_FORM_SUBMIT_VALIDATE_SUCCESS = "onFormSubmitValidateSuccess",
  ON_FORM_SUBMIT_VALIDATE_FAILED = "onFormSubmitValidateFailed",
  ON_FORM_SUBMIT_VALIDATE_END = "onFormSubmitValidateEnd",
  ON_FORM_SUBMIT_SUCCESS = "onFormSubmitSuccess",
  ON_FORM_SUBMIT_FAILED = "onFormSubmitFailed",
  ON_FORM_VALUES_CHANGE = "onFormValuesChange",
  ON_FORM_INITIAL_VALUES_CHANGE = "onFormInitialValuesChange",
  ON_FORM_VALIDATE_START = "onFormValidateStart",
  ON_FORM_VALIDATING = "onFormValidating",
  ON_FORM_VALIDATE_SUCCESS = "onFormValidateSuccess",
  ON_FORM_VALIDATE_FAILED = "onFormValidateFailed",
  ON_FORM_VALIDATE_END = "onFormValidateEnd",
  ON_FORM_INPUT_CHANGE = "onFormInputChange",
  ON_FORM_GRAPH_CHANGE = "onFormGraphChange",

  /**
   * Field LifeCycle
   **/

  ON_FIELD_INIT = "onFieldInit",
  ON_FIELD_INPUT_VALUE_CHANGE = "onFieldInputValueChange",
  ON_FIELD_VALUE_CHANGE = "onFieldValueChange",
  ON_FIELD_CLICK = "onFieldOnClick",
  ON_FIELD_INITIAL_VALUE_CHANGE = "onFieldInitialValueChange",
  ON_FIELD_VALIDATE_START = "onFieldValidateStart",
  ON_FIELD_VALIDATING = "onFieldValidating",
  ON_FIELD_VALIDATE_SUCCESS = "onFieldValidateSuccess",
  ON_FIELD_VALIDATE_FAILED = "onFieldValidateFailed",
  ON_FIELD_VALIDATE_END = "onFieldValidateEnd",
  ON_FIELD_LOADING = "onFieldLoading",
  ON_FIELD_RESET = "onFieldReset",
  ON_FIELD_MOUNT = "onFieldMount",
  ON_FIELD_UNMOUNT = "onFieldUnmount",
}

export interface IHeartProps<Context> {
  lifecycles?: LifeCycle[];
  context?: Context;
}

export interface IFormProps<T extends object = any> {
  values?: Partial<T>;
  initialValues?: Partial<T>;
  pattern?: FormPatternTypes;
  display?: FormDisplayTypes;
  hidden?: boolean;
  visible?: boolean;
  editable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  readPretty?: boolean;
  key?: string;
  effects?: (form: Form<T>) => void;
  validateFirst?: boolean;
  designable?: boolean;
  perProps?: any;
  variables?: any;
  flowData?: any;
}
