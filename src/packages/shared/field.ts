import { isNumber } from 'lodash'

// 获取组建的容器
export const findContainerField = (field) => {
  const segments = field?.address?.segments.filter((item) => !isNumber(item))

  for (let i = 0; i < segments?.length; i++) {
    const address = segments.slice(0, segments.length - i).join('.')
    try {
      const queryField = field.query(address).take()
      if (queryField && queryField.containerForm) {
        return queryField
      }
    } catch (err) {}
  }
}
