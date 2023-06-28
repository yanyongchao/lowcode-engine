import { Heart } from "./Heart";
import { Graph } from "./Graph";
import {
  IFormProps,
  FormPatternTypes,
  FormDisplayTypes,
  IFormFields,
  IFormRequests,
  IFormMergeStrategy,
  LifeCycleTypes,
  IFieldFactoryProps,
  JSXComponent,
} from "../types";
import { runEffects } from "../shared/effectbox";
import { isValid, uid, isPlainObj, merge, FormPath } from "@/packages/shared";
import {
  define,
  observable,
  batch,
  action,
  observe,
} from "@/packages/reactive";
import { getValidFormValues } from "../shared/internals";
import { Field } from "./Field";

export class Form<ValueType extends object = any> {
  displayName = "Form";
  id: string;
  initialized: boolean;
  validating: boolean;
  submitting: boolean;
  loading: boolean;
  modified: boolean;
  pattern: FormPatternTypes;
  display: FormDisplayTypes;
  values: ValueType;
  initialValues: ValueType;
  mounted: boolean;
  unmounted: boolean;
  props: IFormProps<ValueType>;
  heart: Heart;
  graph: Graph;
  fields: IFormFields = {};
  requests: IFormRequests = {};
  indexes: Record<string, string> = {};
  disposers: (() => void)[] = [];

  constructor(props: IFormProps<ValueType>) {
    this.initialize(props);
    this.makeObservable();
    this.makeReactive();
    this.makeValues();
    this.onInit();
  }

  protected initialize(props: IFormProps<ValueType>) {
    this.id = uid();
    this.props = { ...props };
    this.initialized = false;
    this.submitting = false;
    this.validating = false;
    this.loading = false;
    this.modified = false;
    this.mounted = false;
    this.unmounted = false;
    this.display = this.props.display || "visible";
    this.pattern = this.props.pattern || "editable";
    this.editable = this.props.editable;
    this.disabled = this.props.disabled;
    this.readOnly = this.props.readOnly;
    this.readPretty = this.props.readPretty;
    this.visible = this.props.visible;
    this.hidden = this.props.hidden;
    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this,
    });
  }

  protected makeObservable() {
    define(this, {
      fields: observable.shallow,
      indexes: observable.shallow,
      initialized: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      loading: observable.ref,
      modified: observable.ref,
      pattern: observable.ref,
      display: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      values: observable,
      initialValues: observable,
      hidden: observable.computed,
      visible: observable.computed,
      editable: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      disabled: observable.computed,
      setValues: action,
    });
  }

  protected makeReactive() {
    this.disposers.push(
      observe(
        this,
        (change) => {
          // console.log("changexxxxxxx[----", change);
        },
        true
      )
    );
  }

  protected makeValues() {
    this.values = getValidFormValues(this.props.values);
    this.initialValues = getValidFormValues(this.props.initialValues);
  }

  get lifecycles() {
    return runEffects(this, this.props.effects);
  }

  get hidden() {
    return this.display === "hidden";
  }

  get visible() {
    return this.display === "visible";
  }

  set hidden(hidden: boolean) {
    if (!isValid(hidden)) return;
    if (hidden) {
      this.display = "hidden";
    } else {
      this.display = "visible";
    }
  }

  set visible(visible: boolean) {
    if (!isValid(visible)) return;
    if (visible) {
      this.display = "visible";
    } else {
      this.display = "none";
    }
  }

  get editable() {
    return this.pattern === "editable";
  }

  set editable(editable) {
    if (!isValid(editable)) return;
    if (editable) {
      this.pattern = "editable";
    } else {
      this.pattern = "readPretty";
    }
  }

  get readOnly() {
    return this.pattern === "readOnly";
  }

  set readOnly(readOnly) {
    if (!isValid(readOnly)) return;
    if (readOnly) {
      this.pattern = "readOnly";
    } else {
      this.pattern = "editable";
    }
  }

  get disabled() {
    return this.pattern === "disabled";
  }

  set disabled(disabled) {
    if (!isValid(disabled)) return;
    if (disabled) {
      this.pattern = "disabled";
    } else {
      this.pattern = "editable";
    }
  }

  get readPretty() {
    return this.pattern === "readPretty";
  }

  set readPretty(readPretty) {
    if (!isValid(readPretty)) return;
    if (readPretty) {
      this.pattern = "readPretty";
    } else {
      this.pattern = "editable";
    }
  }

  /** 创建字段 **/
  createFeild = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ): Field<Decorator, Component> => {
    const address = FormPath.parse(props.basePath).concat(props.name);
    const identifier = address.toString();
    if (!identifier) return;
    if (!this.fields[identifier] || this.props.designable) {
      batch(() => {
        new Field(address, props, this, this.props.designable);
      });
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
    }
    return this.fields[identifier] as any;
  };

  /** 状态操作模型 **/

  setValues = (values: any, strategy: IFormMergeStrategy = "merge") => {
    if (!isPlainObj(values)) return;
    if (strategy === "merge" || strategy === "deepMerge") {
      merge(this.values, values, {
        arrayMerge: (target, source) => source,
        assign: true,
      });
    } else if (strategy === "shallowMerge") {
      Object.assign(this.values, values);
    } else {
      this.values = values as any;
    }
  };

  notify = (type: string, payload?: any) => {
    this.heart.publish(type, isValid(payload) ? payload : this);
  };

  /**事件钩子**/

  onInit = () => {
    this.initialized = true;
    this.notify(LifeCycleTypes.ON_FORM_INIT);
  };
}
