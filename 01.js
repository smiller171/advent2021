#!/usr/bin/env node
const fs = require('fs')

let countDepthIncreases = (prev, curr, index, array) => curr > array[ index - 1 ] ? prev + 1 : prev

console.log(
  fs.readFileSync('inputs/01.txt')
    .toString()
    .split('\n')
    .map(Number)
    .reduce(countDepthIncreases, 0)
)
