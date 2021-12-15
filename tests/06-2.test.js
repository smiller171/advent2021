const fs = require('fs')
import { School } from '../06'
import * as solution from '../06-2'
let testData = fs.readFileSync("tests/06.txt")
  .toString()
  .trimEnd()
  .split(',')
  .map(Number)

test('should have accurate test data', () => {
  expect(testData).toEqual([ 3, 4, 3, 1, 2 ])
})

describe('School class', () => {
  test('should have a School class', () => {
    expect(solution.School).toBeDefined()
  })
  let testSchool = new solution.School(testData)
  test('should have accurate initial timerGroups', () => {
    expect(testSchool.timerGroups).toEqual([ 0, 1, 1, 2, 1, 0, 0, 0, 0 ])
  })
  test('should be able to iterate', () => {
    expect(testSchool.getFish(1)).toEqual([ 1, 1, 2, 1, 0, 0, 0, 0, 0 ])
    expect(testSchool.getFish(2)).toEqual([ 1, 2, 1, 0, 0, 0, 1, 0, 1 ])
    expect(testSchool.getFish(3)).toEqual([ 2, 1, 0, 0, 0, 1, 1, 1, 1 ])
    expect(testSchool.getFish(4)).toEqual([ 1, 0, 0, 0, 1, 1, 3, 1, 2 ])
  })
  test('should have 26 fish after 18 days', () => {
    expect(testSchool.getFishCount(18)).toEqual(26)
  })
  test('should have 5934 fish after 80 days', () => {
    expect(testSchool.getFishCount(80)).toEqual(5934)
  })
  test('should have 26984457539 fish after 256 days', () => {
    expect(testSchool.getFishCount(256)).toEqual(26984457539)
  })
})
