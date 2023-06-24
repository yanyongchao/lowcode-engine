export interface IParamsForObject {
  [key: string]: string
}

export const getParamsForObject = (): IParamsForObject => {
  let url = window.location.search || window.location.hash
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substr(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      obj[key] = decodeURIComponent(tempArr[1])
    })
  }
  return obj
}

export const getParamsForValue = (param: string) => {
  let reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)', 'i')
  let r = window.location.href.split('?')[1]
    ? window.location.href.split('?')[1].match(reg)
    : null
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return false
}

export const setUrlParams = (data = {}) => {
  const { hash } = window.location
  const _result = []
  const _newHashObj = {}
  const _newHashArr = []
  let newHash = ''
  for (let key in data) {
    let value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      continue
    }
    _result.push(key + '=' + value)
  }
  if (_result.length) {
    if (hash.includes('?')) {
      newHash = `${window.location.hash}&${_result.join('&')}`
    } else {
      newHash = `${window.location.hash}?${_result.join('&')}`
    }
  }
  const splitHash = newHash.split('?')
  const splitAndHash = splitHash[1].split('&')
  // 去重
  splitAndHash.forEach((item) => {
    const [key, value] = item.split('=')
    _newHashObj[key] = value
  })
  for (let key in _newHashObj) {
    _newHashArr.push(key + '=' + _newHashObj[key])
  }
  window.location.hash = `${splitHash[0]}?${_newHashArr.join('&')}`
}
