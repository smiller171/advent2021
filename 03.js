#!/usr/bin/env node
const fs = require('fs')

let inputArray = fs.readFileSync('inputs/03.txt')
  .toString()
  .trimEnd()
  .split('\n')

let initCounter = string => string.split('').map(e => 0)

let gammaCounterReducer = (string, curr) => curr > 0 ? string + '1' : string + '0'
let epsilonCounterReducer = (string, curr) => curr > 0 ? string + '0' : string + '1'

let gammaCounter = (counter, curr) => {
  curr.split('').forEach((element, index) => {
    switch (element) {
      case '1':
        counter[ index ]++
        break
      case '0':
        counter[ index ]--
        break
      default:
        console.error('Invalid value!', curr)
        break
    }
  })
  return counter
}

let gammaCount = array => array.reduce(gammaCounter, initCounter(array[ 0 ]))
let gammaRate = parseInt(gammaCount(inputArray).reduce(gammaCounterReducer, ''), 2)
let epsilonRate = parseInt(gammaCount(inputArray).reduce(epsilonCounterReducer, ''), 2)

console.log('gamma rate is: ', gammaRate)
console.log('epsilon rate is: ', epsilonRate)
console.log('Power consumption is: ', epsilonRate * gammaRate)

let positionCounter = (counter, curr) => curr === '1' ? counter + 1 : counter - 1

let getBitCriteriaOxygen = (array, pos) => array
  .map(e => e[ pos ])
  .reduce(positionCounter, 0) >= 0 ? '1' : '0'

let getBitCriteriaCO2 = (array, pos) => array
  .map(e => e[ pos ])
  .reduce(positionCounter, 0) >= 0 ? '0' : '1'

let oxygenArray = [ ...inputArray ]
for (let pos = 0; oxygenArray.length > 1; pos++) {
  let criteria = getBitCriteriaOxygen(oxygenArray, pos)
  oxygenArray = oxygenArray.filter(e => e[ pos ] === criteria)
}

let co2Array = [ ...inputArray ]
for (let pos = 0; co2Array.length > 1; pos++) {
  let criteria = getBitCriteriaCO2(co2Array, pos)
  co2Array = co2Array.filter(e => e[ pos ] === criteria)
}

let oxygenRating = parseInt(oxygenArray[ 0 ], 2)
let co2Rating = parseInt(co2Array[ 0 ], 2)

console.log(`Oxygen generator rating is ${oxygenRating}`)
console.log(`CO2 scrubber rating is ${co2Rating}`)
console.log(`Life support rating is ${co2Rating * oxygenRating}`)
