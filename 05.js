import Data from './dataimport'

class VentLine {
  constructor(string) {
    let stringList = string.split(' -> ')
    this.points = stringList.map(e => e.split(',').map(Number))
  }
}

class VentLines {
  constructor(inputList) {
    this.list = inputList.map(e => new VentLine(e).points)
  }
}

class VentGrid {
  constructor(ventLines) {
    let clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item)
    let isVertical = line => line[ 0 ][ 0 ] === line[ 1 ][ 0 ]
    let isHorizontal = line => line[ 0 ][ 1 ] === line[ 1 ][ 1 ]
    let xlimit = ventLines.flat().reduce((prev, curr) => prev[ 0 ] > curr[ 0 ] ? prev : curr)[ 0 ] + 1
    let ylimit = ventLines.flat().reduce((prev, curr) => prev[ 1 ] > curr[ 1 ] ? prev : curr)[ 1 ] + 1
    let gridTemplate = new Array(xlimit).fill(new Array(ylimit).fill(0))
    let grid = clone(gridTemplate)
    ventLines.forEach(line => {
      if (isHorizontal(line)) {
        let y = line[ 0 ][ 1 ]
        let sorted = [ ...line ].sort((a, b) => a[ 0 ] - b[ 0 ])
        for (let x = sorted[ 0 ][ 0 ]; x <= sorted[ 1 ][ 0 ]; x++) {
          grid[ y ][ x ] = grid[ y ][ x ] + 1
        }
      }
      if (isVertical(line)) {
        let x = line[ 0 ][ 0 ]
        let sorted = [ ...line ].sort((a, b) => a[ 1 ] - b[ 1 ])
        for (let y = sorted[ 0 ][ 1 ]; y <= sorted[ 1 ][ 1 ]; y++) {
          grid[ y ][ x ] = grid[ y ][ x ] + 1
        }
      }
    })
    this.grid = grid
    this.overlapCount = grid.flat(2).reduce((count, curr) => curr > 1 ? count + 1 : count, 0)
  }
}

let inputArray = new Data('inputs/05.txt').inputArray
let ventLines = new VentLines(inputArray).list
let grid = new VentGrid(ventLines)
console.log(grid.overlapCount)

export { VentLine, VentLines, VentGrid }
