import Data from './dataimport'

class VentLine {
  constructor(string) {
    let stringList = string.split(' -> ')
    let endpoints = stringList.map(e => e.split(',').map(Number))
    this.isVertical = endpoints[ 0 ][ 0 ] === endpoints[ 1 ][ 0 ]
    this.isHorizontal = endpoints[ 0 ][ 1 ] === endpoints[ 1 ][ 1 ]
    this.isDiagonal = !(this.isHorizontal || this.isVertical)
    this.points = new Set
    this.xlimit = endpoints.reduce((a, b) => a[ 0 ] > b[ 0 ] ? a[ 0 ] : b[ 0 ])
    this.ylimit = endpoints.reduce((a, b) => a[ 1 ] > b[ 1 ] ? a[ 1 ] : b[ 1 ])
    if (this.isHorizontal) {
      let y = endpoints[ 0 ][ 1 ]
      let sorted = [ ...endpoints ].sort((a, b) => a[ 0 ] - b[ 0 ])
      for (let x = sorted[ 0 ][ 0 ]; x <= sorted[ 1 ][ 0 ]; x++) {
        this.points.add([ x, y ])
      }
    } else if (this.isVertical) {
      let x = endpoints[ 0 ][ 0 ]
      let sorted = [ ...endpoints ].sort((a, b) => a[ 1 ] - b[ 1 ])
      for (let y = sorted[ 0 ][ 1 ]; y <= sorted[ 1 ][ 1 ]; y++) {
        this.points.add([ x, y ])
      }
    } else {
      let sorted = [ ...endpoints ].sort((a, b) => a[ 0 ] - b[ 0 ])
      // after sorting so that X is always increasing, try both increasing and decreasing for y
      for (let y = sorted[ 0 ][ 1 ], x = sorted[ 0 ][ 0 ]; y <= sorted[ 1 ][ 1 ]; y++, x++) {
        this.points.add([ x, y ])
      }
      for (let y = sorted[ 0 ][ 1 ], x = sorted[ 0 ][ 0 ]; y >= sorted[ 1 ][ 1 ]; y--, x++) {
        this.points.add([ x, y ])
      }
    }
  }
}

class VentGrid {
  constructor(inputArray) {
    let ventLines = inputArray.map(e => new VentLine(e))
    let clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item)
    let xlimit = ventLines.reduce((prev, curr) => prev.xlimit > curr.xlimit ? prev : curr).xlimit + 1
    let ylimit = ventLines.reduce((prev, curr) => prev.ylimit > curr.ylimit ? prev : curr).ylimit + 1
    let gridTemplate = new Array(xlimit).fill(new Array(ylimit).fill(0))
    // Deep cloning the template so that each row isn't a ref to the same Array
    let horizontalGrid = clone(gridTemplate)
    ventLines.forEach(line => {
      if (!line.isDiagonal) {
        line.points.forEach(point => {
          let x = point[ 0 ]
          let y = point[ 1 ]
          horizontalGrid[ y ][ x ]++
        })
      }
    })

    let grid = clone(gridTemplate)
    ventLines.forEach(line => {
      line.points.forEach(point => {
        let x = point[ 0 ]
        let y = point[ 1 ]
        grid[ y ][ x ]++
      })
    })
    let gridReducer = (count, curr) => curr > 1 ? count + 1 : count
    this.horizontalGrid = horizontalGrid
    this.grid = grid
    this.horizontalOverlapCount = horizontalGrid.flat(2).reduce(gridReducer, 0)
    this.overlapCount = grid.flat(2).reduce(gridReducer, 0)
  }
}

let inputArray = new Data('inputs/05.txt').inputArray
let grid = new VentGrid(inputArray)
console.log(grid.horizontalOverlapCount, grid.overlapCount)

export { VentLine, VentGrid }
