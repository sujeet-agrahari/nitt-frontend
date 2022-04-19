export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const getDate = (date) => {
  console.log(date)
  date = new Date(date);
  return date.toISOString().replace(/T.*/, '').split('-').reverse().join('-')
}

export const percentage = (partialValue, totalValue) => (100 * partialValue) / totalValue 
