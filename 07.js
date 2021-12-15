import Data from './dataimport'

class CrabAligner {
  constructor(list) {
    this.crabs = [ ...list ].sort((a, b) => a - b)
    this.getCost = n => this.crabs.reduce((sum, crab) => sum + Math.abs(crab - n), 0)
    this.getCostMap = () => {
      let start = this.crabs[ 0 ]
      let end = this.crabs.at(-1)
      let result = []
      for (let pos = start; pos < end; pos++) {
        result.push({
          pos,
          cost: this.getCost(pos)
        })
      }
      return result
    }
  }

  get optimalPosition() {
    return this.getCostMap().reduce((a, b) => a.cost < b.cost ? a : b).pos
  }

  get optimalFuelUse() {
    return this.getCostMap().reduce((a, b) => a.cost < b.cost ? a : b).cost
  }
}

export { CrabAligner }

let inputArray = new Data('inputs/07.txt').inputArray
let aligner = new CrabAligner(inputArray)
console.log(aligner.optimalFuelUse)

