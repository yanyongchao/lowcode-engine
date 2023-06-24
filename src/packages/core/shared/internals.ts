import {
  FormPath,
  FormPathPattern,
  each,
  pascalCase,
  isFn,
  isValid,
  isUndef,
  isEmpty,
  isPlainObj,
  isNumberLike,
  clone,
  toArr,
} from "@/packages/shared";

import {
  autorun,
  batch,
  contains,
  toJS,
  isObservable,
  DataChange,
  reaction,
  untracked,
} from "@/packages/reactive";
import { Field, ArrayField, Form, ObjectField } from "../models";
import {
  ISpliceArrayStateProps,
  IExchangeArrayStateProps,
  IFieldResetOptions,
  ISearchFeedback,
  IFieldFeedback,
  INodePatch,
  GeneralField,
  IFormFeedback,
  LifeCycleTypes,
  FieldMatchPattern,
} from "../types";

import { GlobalState } from "./constants";

const hasOwnProperty = Object.prototype.hasOwnProperty;

export const getValidFormValues = (values: any) => {
  if (isObservable(values)) return values;
  return clone(values || {});
};

export const allowAssignDefaultValue = (target: any, source: any) => {
  const isValidTarget = !isUndef(target);
  const isValidSource = !isUndef(source);
  if (!isValidTarget) {
    return isValidSource;
  }

  if (typeof target === typeof source) {
    if (target === "") return false;
    if (target === 0) return false;
  }

  const isEmptyTarget = target !== null && isEmpty(target, true);
  const isEmptySource = source !== null && isEmpty(source, true);
  if (isEmptyTarget) {
    return !isEmptySource;
  }
  return false;
};

export const patchFormValues = (
  form: Form,
  path: Array<string | number>,
  source: any
) => {
  const update = (path: Array<string | number>, source: any) => {
    if (path.length) {
      form.setValuesIn(path, clone(source));
    } else {
      Object.assign(form.values, clone(source));
    }
  };

  const patch = (source: any, path: Array<string | number> = []) => {
    const targetValue = form.getValuesIn(path);
    const targetField = form.query(path).take();
    const isUnVoidField = targetField && !isVoidField(targetField);

    if (isUnVoidField && targetField.display === "none") {
      targetField.caches.value = clone(source);
      return;
    }

    if (allowAssignDefaultValue(targetValue, source)) {
      update(path, source);
    } else {
      if (isEmpty(source)) return;
      if (GlobalState.initializing) return;
      if (isPlainObj(targetValue) && isPlainObj(source)) {
        each(source, (value, key) => {
          patch(value, path.concat(key));
        });
      } else {
        if (targetField) {
          if (isUnVoidField && !targetField.selfModified) {
            update(path, source);
          }
        } else if (form.initialized) {
          update(path, source);
        }
      }
    }
  };
  patch(source, path);
};

export const triggerFormInitialValuesChange = (
  form: Form,
  change: DataChange
) => {
  if (Array.isArray(change.object) && change.key === "length") return;
  if (
    contains(form.initialValues, change.object) ||
    form.initialValues === change.value
  ) {
    if (change.type === "add" || change.type === "set") {
      patchFormValues(form, change.path.slice(1), change.value);
    }
    if (form.initialized) {
      form.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE);
    }
  }
};

export const triggerFormValuesChange = (form: Form, change: DataChange) => {
  if (Array.isArray(change.object) && change.key === "length") return;
  if (
    (contains(form.values, change.object) || form.values === change.value) &&
    form.initialized
  ) {
    form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE);
  }
};
