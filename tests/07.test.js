import * as solution from '../07'
import Data from '../dataimport'
let testData = new Data('tests/07.txt').inputArray.map(Number)

test('should have accurate test data', () => {
  expect(testData).toEqual([ 16, 1, 2, 0, 4, 2, 7, 1, 2, 14 ])
})

test('should have CrabAligner class', () => {
  expect(solution.CrabAligner).toBeDefined()
})

let testAligner = new solution.CrabAligner(testData)
test('should have a sorted list of crabs', () => {
  expect(testAligner.crabs).toEqual([ 0, 1, 1, 2, 2, 2, 4, 7, 14, 16 ])
})

test('should be able to calculate fuel cost for a given position', () => {
  expect(testAligner.getCost(2)).toEqual(37)
  expect(testAligner.getCost(1)).toEqual(41)
  expect(testAligner.getCost(3)).toEqual(39)
  expect(testAligner.getCost(10)).toEqual(71)
})
test('should be able to calculate optimal position', () => {
  expect(testAligner.optimalPosition).toEqual(2)
})
test('should be able to get fuel usage for optimal position', () => {
  expect(testAligner.optimalFuelUse).toEqual(37)
})
