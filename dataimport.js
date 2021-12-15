const fs = require('fs')
class Data {
  constructor(inputpath) {
    this.arrayRotator = array => array[ 0 ].map((_, colIndex) => array.map(row => row[ colIndex ]))
    this.inputArray = fs.readFileSync(inputpath)
      .toString()
      .trimEnd()
      .split('\n')
    if (this.inputArray.length === 1) {
      this.inputArray = this.inputArray[ 0 ].split(',')
    }
  }
}

export default Data
