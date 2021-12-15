const fs = require('fs')

class School {
  constructor(initList) {
    this.timerGroups = [
      (initList.filter(e => e === 0).length),
      (initList.filter(e => e === 1).length),
      (initList.filter(e => e === 2).length),
      (initList.filter(e => e === 3).length),
      (initList.filter(e => e === 4).length),
      (initList.filter(e => e === 5).length),
      (initList.filter(e => e === 6).length),
      (initList.filter(e => e === 7).length),
      (initList.filter(e => e === 8).length)
    ]
    let iterator = list => [
      (list[ 1 ]),
      (list[ 2 ]),
      (list[ 3 ]),
      (list[ 4 ]),
      (list[ 5 ]),
      (list[ 6 ]),
      (list[ 7 ] + list[ 0 ]),
      (list[ 8 ]),
      (list[ 0 ])
    ]
    let countReducer = (a, b) => a + b
    this.getFish = n => {
      let result = [ ...this.timerGroups ]
      for (let i = 0; i < n; i++) {
        result = iterator(result)
      }
      return result
    }
    this.getFishCount = n => this.getFish(n).reduce(countReducer)
  }
}

let inputList = fs.readFileSync("inputs/06.txt")
  .toString()
  .trimEnd()
  .split(',')
  .map(Number)

let school = new School(inputList)
console.log(school.getFishCount(80))
console.log(school.getFishCount(256))

export { School }
