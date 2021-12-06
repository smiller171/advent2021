#!/usr/bin/env node
const fs = require('fs')

let countDepthIncreases = (prev, curr, index, array) => curr > array[ index - 1 ] ? prev + 1 : prev

let inputArray = fs.readFileSync('inputs/01.txt')
  .toString()
  .split('\n')
  .map(Number)

console.log(
  inputArray.reduce(countDepthIncreases, 0)
)

let getSlidingWindows = array => array
  .map((element, index) => element + array[ index + 1 ] + array[ index + 2 ])
  .slice(0, -3)

let slidingArray = getSlidingWindows(inputArray)

console.log(
  slidingArray.reduce(countDepthIncreases, 0)
)
