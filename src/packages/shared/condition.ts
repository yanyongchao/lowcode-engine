import { isEmpty, get } from 'lodash'

type Group<T> =
  | {
      type: 'or' | 'and'
      children: Group<T>[]
    }
  | T

type Cattorn = {
  value: string
  type: 'text' | 'variable' | 'sql' | 'containerfield' | 'expression'
}

type OperatorType =
  | '>'
  | '<'
  | '='
  | '!='
  | '>='
  | '<='
  | '=='
  | '~'
  | '!~'
  | 'null'
  | '!null'

type Item = {
  operator: OperatorType
  value: Cattorn
  variable: Cattorn
}

const getRunValue = (data: Cattorn, scope) => {
  const { value, type } = data

  let hasError = false

  if (type === 'expression') {
    const { compile } = scope
    let result
    try {
      result = compile(value)
    } catch {
      hasError = true
    }
    return {
      result,
      hasError,
    }
  }

  if (type === 'containerfield' || type === 'sql') {
    const { values = {}, details = {} } = scope || {}

    const flatValues = Object.values(values).reduce((memo, cur) => {
      memo = { ...(memo || {}), ...(cur || {}) }
      return memo
    }, {})

    return {
      result: details[value] ?? flatValues[value] ?? values[value],
    }
  }

  if (type === 'variable') {
    const { variables = {} } = scope || {}
    return {
      result: variables[value],
    }
  }

  // 没有type，就是输入框输入的普通文本
  return {
    result: value,
  }
}

const parseCondition = (data: Item, scope) => {
  const { operator, value, variable } = data

  let { result: curVariable, hasError: hasVariableError } = getRunValue(
    variable,
    scope
  )
  let { result: curValue, hasError: hasCurError } = getRunValue(value, scope)

  if (operator === '==') return true

  if (hasVariableError) return false

  if (operator === 'null') return isEmpty(curVariable)

  if (operator === '!null') return !isEmpty(curVariable)

  if (hasCurError) return false

  if (operator === '~') return (curVariable || '').includes(curValue)

  if (operator === '!~') return !(curVariable || '').includes(curValue)

  if (operator === '!=') return curVariable != curValue

  if (operator === '=') return curVariable == curValue

  /** 比较大小使用number类型比较，暂时忽略超大数 */
  curValue = Number(curValue)
  curVariable = Number(curVariable)

  if (operator === '>') return curVariable > curValue

  if (operator === '<') return curVariable < curValue

  if (operator === '<=') return curVariable <= curValue

  if (operator === '>=') return curVariable >= curValue
}

const parseGroup = (data: Group<Item>, parse) => {
  const { type, children } = data as {
    type: 'or' | 'and'
    children: Group<Item>[]
  }

  if (type === 'or') {
    return children.some((item) => parseGroup(item, parse))
  }

  if (type === 'and') {
    return children.every((item) => parseGroup(item, parse))
  }

  return parse(data)
}

export const parseConditionRender = (data, scope) => {
  return parseGroup(data[0], (d) => parseCondition(d, scope))
}
