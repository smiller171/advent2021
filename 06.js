const fs = require('fs')

class LanternFish {
  constructor(init) {
    this.spawnTimer = Number(init)
    this.tick = (school) => {
      if (this.spawnTimer > 0) {
        this.spawnTimer--
      } else {
        this.spawnTimer = 6
        if (school) {
          school.push(new LanternFish(8))
        }
      }
    }
  }
}

class School {
  constructor(initList) {
    this.fishes = initList.map(e => new LanternFish(e))
    this.tick = () => {
      this.fishes.forEach(fish => fish.tick(this.fishes))
    }
    this.ticks = n => {
      for (let i = 0; i < n; i++) {
        this.tick(this.fishes)
      }
    }
  }
}

let inputList = fs.readFileSync("inputs/06.txt")
  .toString()
  .trimEnd()
  .split(',')
  .map(Number)

let school = new School(inputList)
school.ticks(80)
console.log(school.fishes.length)

export { LanternFish, School }
