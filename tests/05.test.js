import * as solution from '../05'
import Data from '../dataimport'
let testData = new Data('tests/05.txt').inputArray
let testLines = new solution.VentLines(testData).list
let testGrid = new solution.VentGrid(testLines)

describe('Vent Lines', () => {
  test('Can create an accurate vent line', () => {
    let testLine = new solution.VentLine('0,9 -> 5,9')
    expect(testLine.points).toEqual([ [ 0, 9 ], [ 5, 9 ] ])
  })
  debugger
  test('should create a list of VentLine objects', () => {
    expect(testLines).toEqual([
      [ [ 0, 9 ], [ 5, 9 ] ],
      [ [ 8, 0 ], [ 0, 8 ] ],
      [ [ 9, 4 ], [ 3, 4 ] ],
      [ [ 2, 2 ], [ 2, 1 ] ],
      [ [ 7, 0 ], [ 7, 4 ] ],
      [ [ 6, 4 ], [ 2, 0 ] ],
      [ [ 0, 9 ], [ 2, 9 ] ],
      [ [ 3, 4 ], [ 1, 4 ] ],
      [ [ 0, 0 ], [ 8, 8 ] ],
      [ [ 5, 5 ], [ 8, 2 ] ]
    ])
  })
})

describe('Vent Grid', () => {
  test('should be able to produce a grid', () => {
    expect(testGrid.grid.length).toEqual(10)
    expect(testGrid.grid[ 0 ].length).toEqual(10)
    expect(testGrid.grid.map(e => e.toString())).toEqual([
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
    expect(testGrid.overlapCount).toEqual(5)
  })
})
