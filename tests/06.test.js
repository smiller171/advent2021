const fs = require('fs')
import * as solution from '../06'
let testData = fs.readFileSync("tests/06.txt")
  .toString()
  .trimEnd()
  .split(',')
  .map(Number)

test('should have accurate test data', () => {
  expect(testData).toEqual([ 3, 4, 3, 1, 2 ])
})

describe('LanternFish class', () => {
  test('should have a LanternFish class', () => {
    expect(solution.LanternFish).toBeDefined()
  })
  let testFish = new solution.LanternFish(4)
  test('spawnTimer property should start as the initial value', () => {
    expect(testFish.spawnTimer).toEqual(4)
  })
  test('spawnTimer can decrement', () => {
    testFish.tick()
    expect(testFish.spawnTimer).toEqual(3)
  })
  test('spawnTimer rolls over', () => {
    testFish.tick()
    expect(testFish.spawnTimer).toEqual(2)
    testFish.tick()
    expect(testFish.spawnTimer).toEqual(1)
    testFish.tick()
    expect(testFish.spawnTimer).toEqual(0)
    testFish.tick()
    expect(testFish.spawnTimer).toEqual(6)
  })
  test('can spawn a new fish', () => {
    testFish.spawnTimer = 0
    let school = [ testFish ]
    expect(testFish.spawnTimer).toEqual(0)
    testFish.tick(school)
    expect(school[ 1 ]).toBeDefined()
    expect(school[ 1 ]).toBeInstanceOf(solution.LanternFish)
    expect(school[ 1 ].spawnTimer).toEqual(8)
  })
})

describe('School class', () => {
  test('should have a School class', () => {
    expect(solution.School).toBeDefined()
  })
  test('should contain a list of fish', () => {
    let testSchool = new solution.School(testData)
    expect(testSchool).toBeInstanceOf(solution.School)
    expect(testSchool.fishes).toBeDefined()
    expect(testSchool.fishes).toBeInstanceOf(Array)
    testSchool.fishes.forEach((fish, i) => {
      expect(fish).toBeInstanceOf(solution.LanternFish)
      expect(fish.spawnTimer).toEqual(testData[ i ])
    })
  })
  test('should be able to iterate', () => {
    let testSchool = new solution.School(testData)
    expect(testSchool.tick).toBeDefined
    testSchool.tick()
    testSchool.fishes.forEach((fish, i) => {
      expect(fish.spawnTimer).toEqual([ 2, 3, 2, 0, 1 ][ i ])
    })
  })
  test('should be able to iterate an arbitrary number of times', () => {
    let testSchool = new solution.School(testData)
    expect(testSchool.ticks).toBeDefined()
    testSchool.ticks(18)
    expect(testSchool.fishes.length).toEqual(26)
    expect(testSchool.fishes.map(fish => fish.spawnTimer)).toEqual([
      6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8, 8
    ])
  })
  test('80 ticks should be 5394 fish', () => {
    let testSchool = new solution.School(testData)
    testSchool.ticks(80)
    expect(testSchool.fishes.length).toEqual(5934)
  })
  xtest('256 ticks should be 26984457539 fish', () => {
    let testSchool = new solution.School(testData)
    testSchool.ticks(256)
    expect(testSchool.fishes.length).toEqual(26984457539)
  })
})
