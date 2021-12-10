#!/usr/bin/env node
const fs = require('fs')
class Data {
  constructor(inputpath) {
    let filter1 = item => item === 1
    let filter0 = item => item === 0
    let isMore1 = array => array.filter(filter1).length > array.filter(filter0).length
    let arrayRotator = array => array[ 0 ].map((_, colIndex) => array.map(row => row[ colIndex ]))
    this.inputArray = fs.readFileSync(inputpath)
      .toString()
      .trimEnd()
      .split('\n')
    this.array2d = this.inputArray
      .map(string => string.split('').map(Number))
    this.array2dRotated = arrayRotator(this.array2d)
    this.gammaPosCalc = array => isMore1(array) ? '1' : '0'
    this.epsilonPosCalc = array => isMore1(array) ? '0' : '1'
    this.gammaRateString = this.array2dRotated.reduce(
      (accumulator, curr) => accumulator + this.gammaPosCalc(curr),
      ''
    )
    this.gammaRate = parseInt(this.gammaRateString, 2)
    this.epsilonRateString = this.array2dRotated.reduce(
      (accumulator, curr) => accumulator + this.epsilonPosCalc(curr),
      ''
    )
    this.epsilonRate = parseInt(this.epsilonRateString, 2)
    this.powerConsumption = this.gammaRate * this.epsilonRate
    this.getOxygenBitCriteria = array => array.filter(filter1).length >= array.filter(filter0).length ? 1 : 0
    this.getScrubberBitCriteria = array => array.filter(filter1).length < array.filter(filter0).length ? 1 : 0
    this.filterByCriteria = (array2d, criteria, pos) => array2d.filter(el => el[ pos ] === criteria)
    let getRatingString = (array2d, criteriaGenerator) => {
      let workingArray = [ ...array2d ]
      for (let pos = 0; workingArray.length > 1; pos++) {
        let criteria = criteriaGenerator(arrayRotator(workingArray)[ pos ])
        workingArray = workingArray.filter(e => e[ pos ] === criteria)
      }
      return workingArray[ 0 ].join('')
    }
    this.oxygenRatingString = getRatingString(this.array2d, this.getOxygenBitCriteria)
    this.oxygenRating = parseInt(this.oxygenRatingString, 2)
    this.scrubberRatingString = getRatingString(this.array2d, this.getScrubberBitCriteria)
    this.scrubberRating = parseInt(this.scrubberRatingString, 2)
    this.lifeSupportRating = this.scrubberRating * this.oxygenRating
  }
}

let data = new Data('inputs/03.txt')
console.log('power consumption is:', data.powerConsumption)
console.log('life support rating is:', data.lifeSupportRating)

export { Data }
