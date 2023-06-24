import { autorun, batch } from "@/packages/reactive";
import { Form } from "../models";
import { LifeCycleTypes } from "../types";
import { createEffectHook } from "../shared/effectbox";

function createFormEffect<T = Form>(type: LifeCycleTypes) {
  return createEffectHook(type, (form: T) => (callback: (form: T) => void) => {
    batch(() => {
      callback(form);
    });
  });
}

export const onFormInit = createFormEffect(LifeCycleTypes.ON_FORM_INIT);
export const onFormMount = createFormEffect(LifeCycleTypes.ON_FORM_MOUNT);
