import * as solution from '../05'
import Data from '../dataimport'
let testData = new Data('tests/05.txt').inputArray
let testGrid = new solution.VentGrid(testData)

describe('Vent Lines', () => {
  test('Can create an accurate horizontal vent line', () => {
    let line = new solution.VentLine('0,9 -> 5,9')
    expect(line.isHorizontal).toEqual(true)
    expect(line.isVertical).toEqual(false)
    expect(line.isDiagonal).toEqual(false)
    expect(line.points).toMatchObject(new Set([
      [ 0, 9 ],
      [ 1, 9 ],
      [ 2, 9 ],
      [ 3, 9 ],
      [ 4, 9 ],
      [ 5, 9 ]
    ]))
  })
  test('Can create an accurate vertical vent line', () => {
    let line = new solution.VentLine('7,0 -> 7,4')
    expect(line.isHorizontal).toEqual(false)
    expect(line.isVertical).toEqual(true)
    expect(line.isDiagonal).toEqual(false)
    expect(line.points).toMatchObject(new Set([
      [ 7, 0 ],
      [ 7, 1 ],
      [ 7, 2 ],
      [ 7, 3 ],
      [ 7, 4 ]
    ]))
  })
  test('Can create an accurate diagonal vent line', () => {
    let line = new solution.VentLine('8,0 -> 0,8')
    expect(line.isHorizontal).toEqual(false)
    expect(line.isVertical).toEqual(false)
    expect(line.isDiagonal).toEqual(true)
    expect(line.points).toMatchObject(new Set([
      [ 8, 0 ],
      [ 7, 1 ],
      [ 6, 2 ],
      [ 5, 3 ],
      [ 4, 4 ],
      [ 3, 5 ],
      [ 2, 6 ],
      [ 1, 7 ],
      [ 0, 8 ]
    ]))
  })
})

describe('Horizontal Grid', () => {
  test('should be able to produce a grid', () => {
    expect(testGrid.horizontalGrid.length).toEqual(10)
    expect(testGrid.horizontalGrid[ 0 ].length).toEqual(10)
    expect(testGrid.horizontalGrid.map(e => e.toString())).toEqual([
      '0,0,0,0,0,0,0,1,0,0',
      '0,0,1,0,0,0,0,1,0,0',
      '0,0,1,0,0,0,0,1,0,0',
      '0,0,0,0,0,0,0,1,0,0',
      '0,1,1,2,1,1,1,2,1,1',
      '0,0,0,0,0,0,0,0,0,0',
      '0,0,0,0,0,0,0,0,0,0',
      '0,0,0,0,0,0,0,0,0,0',
      '0,0,0,0,0,0,0,0,0,0',
      '2,2,2,1,1,1,0,0,0,0'
    ])
  })
  test('should be able to count overlap points', () => {
    expect(testGrid.horizontalOverlapCount).toEqual(5)
  })
})

describe('Full Grid', () => {
  test('should be able to produce a grid', () => {
    expect(testGrid.grid.length).toEqual(10)
    expect(testGrid.grid[ 0 ].length).toEqual(10)
    expect(testGrid.grid.map(e => e.toString())).toEqual([
      "1,0,1,0,0,0,0,1,1,0",
      "0,1,1,1,0,0,0,2,0,0",
      "0,0,2,0,1,0,1,1,1,0",
      "0,0,0,1,0,2,0,2,0,0",
      "0,1,1,2,3,1,3,2,1,1",
      "0,0,0,1,0,2,0,0,0,0",
      "0,0,1,0,0,0,1,0,0,0",
      "0,1,0,0,0,0,0,1,0,0",
      "1,0,0,0,0,0,0,0,1,0",
      "2,2,2,1,1,1,0,0,0,0"
    ])
  })
  test('should be able to count overlap points', () => {
    expect(testGrid.overlapCount).toEqual(12)
  })
})
