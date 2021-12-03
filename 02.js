#!/usr/bin/env node
const fs = require('fs')

let inputArray = fs.readFileSync('inputs/02.txt')
  .toString()
  .trimEnd()
  .split('\n')

let getMovementObject = string => {
  let array = string.split(' ')
  return {
    direction: array[ 0 ],
    distance: Number(array[ 1 ])
  }
}

let positionReducer = (tallyObject, instruction) => {
  switch (instruction.direction) {
    case 'forward':
      tallyObject.horizontal += instruction.distance
      break
    case 'down':
      tallyObject.depth += instruction.distance
      break
    case 'up':
      tallyObject.depth -= instruction.distance
      break
    default:
      console.error('invalid instruction: ', instruction)
  }
  return tallyObject
}

let aimedPositionReducer = (tallyObject, instruction) => {
  switch (instruction.direction) {
    case 'forward':
      tallyObject.horizontal += instruction.distance
      tallyObject.depth += instruction.distance * tallyObject.aim
      break
    case 'down':
      tallyObject.aim += instruction.distance
      break
    case 'up':
      tallyObject.aim -= instruction.distance
      break
    default:
      console.error('invalid instruction: ', instruction)
  }
  return tallyObject
}

let structuredArray = inputArray.map(getMovementObject)
let finalPosition = structuredArray.reduce(positionReducer, { 'horizontal': 0, 'depth': 0 })
let aimedFinalPosition = structuredArray.reduce(aimedPositionReducer, { 'horizontal': 0, 'depth': 0, 'aim': 0 })

console.log('Final position is:', finalPosition)
console.log('Product is:', finalPosition.horizontal * finalPosition.depth)

console.log('Final aimed position is:', aimedFinalPosition)
console.log('Product is:', aimedFinalPosition.horizontal * aimedFinalPosition.depth)
