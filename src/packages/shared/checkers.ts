const isType =
  <T>(type: string | string[]) =>
  (obj: unknown): obj is T =>
    getType(obj) === `[object ${type}]`
export const getType = (obj: any) => Object.prototype.toString.call(obj)
export const isFn = (val: any): val is Function => typeof val === 'function'
export const isDate = (val: string) => !isNaN(Date.parse(val))
export const isArr = Array.isArray
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export const isMap = (val: any): val is Map<any, any> =>
  val && val instanceof Map
export const isSet = (val: any): val is Set<any> => val && val instanceof Set
export const isWeakMap = (val: any): val is WeakMap<any, any> =>
  val && val instanceof WeakMap
export const isWeakSet = (val: any): val is WeakSet<any> =>
  val && val instanceof WeakSet
export const isNumberLike = (index: any): index is number =>
  isNum(index) || /^\d+$/.test(index)
export const isObj = (val: unknown): val is object => typeof val === 'object'
export const isUUID = (val: string) => {
  const reg = new RegExp('w{8}(-w{4}){3}-w{12}')
  return reg.test(val)
}
export const isRegExp = isType<RegExp>('RegExp')
export const isReactElement = (obj: any): boolean =>
  obj && obj['$$typeof'] && obj['_owner']
export const isHTMLElement = (target: any): target is EventTarget => {
  return Object.prototype.toString.call(target).indexOf('HTML') > -1
}

export type Subscriber<S> = (payload: S) => void

export interface Subscription<S> {
  notify?: (payload: S) => void | boolean
  filter?: (payload: S) => any
}

export const isPromise = (obj: any): boolean => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

export const isFunction = (obj: any): boolean => {
  return typeof obj === 'function'
}
