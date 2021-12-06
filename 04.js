#!/usr/bin/env node
const fs = require('fs')

let inputArray = fs.readFileSync('inputs/04.txt')
  .toString()
  .trimEnd()
  .split('\n\n')

let numbersDrawn = inputArray[ 0 ].split(',').map(Number)

class BingoSet {
  constructor(vals) {
    this.values = new Set(vals.map(Number))
    this.markedValues = new Set()
    this.unmarkedValues = new Set(vals.map(Number))
  }
  markValue(val) {
    if (this.values.has(val)) {
      this.markedValues.add(val)
      this.unmarkedValues.delete(val)
    }
  }
  isBingo() {
    return this.values.size === this.markedValues.size
  }
}

class BingoBoard extends BingoSet {
  constructor(rawVals) {
    let getColumn = (list, position) => list.map(row => row[ position ])
    super(rawVals.flat())
    this.rows = rawVals.map(row => new BingoSet(row))
    this.columns = rawVals.map((_list, index) => new BingoSet(getColumn(rawVals, index)))
    this.layout = rawVals
  }

  markValue(val) {
    super.markValue(val)
    if (this.values.has(val)) {
      this.rows.find(row => row.values.has(val))?.markValue(val)
      this.columns.find(column => column.values.has(val))?.markValue(val)
    }
  }

  isBingo() {
    return this.rows.concat(this.columns).some(bingoSet => bingoSet.isBingo())
  }
  get score() {
    return [ ...this.unmarkedValues ].reduce((prev, curr) => prev + curr)
  }
}

let rawBingoBoards = inputArray.slice(1).map(
  rowsString => rowsString.split('\n')
    .map(string => string.trim().split(/\s+/).map(Number))
)

let bingoBoards = rawBingoBoards.map(rawBoard => new BingoBoard(rawBoard))

let findWinner = (numbers, boards) => {
  for (let n of numbersDrawn) {
    bingoBoards.forEach(board => board.markValue(n))
    let winningBoard = bingoBoards.find(board => board.isBingo())
    if (winningBoard !== undefined) {
      return {
        winningBoard,
        totalScore: winningBoard.score * n
      }
    }
  }
}
console.log('first winning score is:', findWinner(numbersDrawn, bingoBoards).totalScore)

let findLastWinner = (numbers, boards) => {
  let boardsSet = new Set(boards)
  let result
  for (let n of numbersDrawn) {
    let winningBoards = new Set()
    boardsSet.forEach(board => {
      board.markValue(n)
      if (board.isBingo()) {
        winningBoards.add(board)
        boardsSet.delete(board)
      }
    })
    if (winningBoards.size === 1) {
      result = {
        'winningBoard': [ ...winningBoards ][ 0 ],
        'finalNumber': n
      }
    }
  }
  return result
}

let lastWinner = findLastWinner(numbersDrawn, bingoBoards)
console.log('last winning score is:', lastWinner.finalNumber * lastWinner.winningBoard.score)
