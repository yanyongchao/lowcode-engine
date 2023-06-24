import { Heart } from "./Heart";
import { IFormProps, FormPatternTypes, FormDisplayTypes } from "../types";
import { runEffects } from "../shared/effectbox";
import { isValid } from "@/packages/shared";

export class Form<ValueType extends object = any> {
  displayName = "Form";
  id: string;
  initialized: boolean;
  validating: boolean;
  submitting: boolean;
  modified: boolean;
  pattern: FormPatternTypes;
  display: FormDisplayTypes;
  values: ValueType;
  initialValues: ValueType;
  mounted: boolean;
  unmounted: boolean;
  props: IFormProps<ValueType>;
  heart: Heart;
  indexes: Map<string, string> = new Map();
  disposers: (() => void)[] = [];

  constructor(props: IFormProps<ValueType>) {
    this.initialize(props);
  }

  protected initialize(props: IFormProps<ValueType>) {
    this.props = { ...props };

    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this,
    });
  }

  get lifecycles() {
    return runEffects(this, this.props.effects);
  }

  notify = (type: string, payload?: any) => {
    this.heart.publish(type, isValid(payload) ? payload : this);
  };
}
