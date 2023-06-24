import { Path } from './index'
interface INode {
  type?: string
  after?: Node
  depth?: number
}

export type Node =
  | IdentifierNode
  | WildcardOperatorNode
  | GroupExpressionNode
  | RangeExpressionNode
  | DestructorExpressionNode
  | ObjectPatternNode
  | ArrayPatternNode
  | DotOperatorNode
  | ExpandOperatorNode
  | INode

export type IdentifierNode = {
  type: 'Identifier'
  value: string
  arrayIndex?: boolean
} & INode

export type IgnoreExpressionNode = {
  type: 'IgnoreExpression'
  value: string
} & INode

export type DotOperatorNode = {
  type: 'DotOperator'
} & INode

export type WildcardOperatorNode = {
  type: 'WildcardOperator'
  filter?: GroupExpressionNode | RangeExpressionNode
} & INode

export type ExpandOperatorNode = {
  type: 'ExpandOperator'
} & INode

export type GroupExpressionNode = {
  type: 'GroupExpression'
  value: Node[]
  isExclude?: boolean
} & INode

export type RangeExpressionNode = {
  type: 'RangeExpression'
  start?: IdentifierNode
  end?: IdentifierNode
} & INode

export type DestructorExpressionNode = {
  type: 'DestructorExpression'
  value?: ObjectPatternNode | ArrayPatternNode
  source?: string
} & INode

export type ObjectPatternNode = {
  type: 'ObjectPattern'
  properties: ObjectPatternPropertyNode[]
} & INode

export type ObjectPatternPropertyNode = {
  type: 'ObjectPatternProperty'
  key: IdentifierNode
  value?: ObjectPatternNode[] | ArrayPatternNode[] | IdentifierNode
} & INode

export type ArrayPatternNode = {
  type: 'ArrayPattern'
  elements: ObjectPatternNode[] | ArrayPatternNode[] | IdentifierNode[]
} & INode

export type DestrcutorRule = {
  key?: string | number
  path?: Array<number | string>
}

export type MatcherFunction = ((path: Segments) => boolean) & {
  path: Path
}

export type Pattern =
  | string
  | number
  | Path
  | Segments
  | MatcherFunction
  | RegExp

export type DestrcutorRules = DestrcutorRule[]

export type Segments = Array<string | number>

export type KeyType = string | number | symbol

export type IAccessors = {
  get?: (source: any, key: KeyType) => any
  set?: (source: any, key: KeyType, value: any) => any
  has?: (source: any, key: KeyType) => boolean
  delete?: (source: any, key: KeyType) => any
}

export type IRegistry = {
  accessors?: IAccessors
}
