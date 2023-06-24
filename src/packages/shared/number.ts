export const toFixed = (value, num) => {
  return Math.floor(value * Math.pow(10, num)) / Math.pow(10, num)
}
