export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getDate = (date) => {
  return date.toISOString().replace(/T.*/, '').split('-').reverse().join('-')
}

export const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
} 
