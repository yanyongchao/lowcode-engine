export interface INode {
  key?: string
  map?: any
  children?: INode[]
}
export const traverseTree = <T extends INode>(
  data: T[],
  callback: (dataItem: T, i: number, data: T[]) => any
) => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i], i, data)
    if (data[i]?.children) {
      traverseTree(data[i]?.children, callback)
    }
  }
}
