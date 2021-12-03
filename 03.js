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
