import * as solution from '../03-new'

describe('part1', () => {
  const testData = new solution.Data('tests/03.txt')
  test('inputArray is array of strings', () => {
    expect(testData.inputArray).toEqual([
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010'
    ])
  })
  test('array2d is 2d array of numbers', () => {
    expect(testData.array2d).toEqual([
      [ 0, 0, 1, 0, 0 ],
      [ 1, 1, 1, 1, 0 ],
      [ 1, 0, 1, 1, 0 ],
      [ 1, 0, 1, 1, 1 ],
      [ 1, 0, 1, 0, 1 ],
      [ 0, 1, 1, 1, 1 ],
      [ 0, 0, 1, 1, 1 ],
      [ 1, 1, 1, 0, 0 ],
      [ 1, 0, 0, 0, 0 ],
      [ 1, 1, 0, 0, 1 ],
      [ 0, 0, 0, 1, 0 ],
      [ 0, 1, 0, 1, 0 ]
    ])
  })
  test('array2dRotated is rotated 2d array of numbers', () => {
    expect(testData.array2dRotated).toEqual([
      [ 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0 ],
      [ 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
      [ 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1 ],
      [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0 ]
    ])
  })
  test('gammaPosCalc works', () => {
    expect(testData.gammaPosCalc(testData.array2dRotated[ 0 ])).toEqual('1')
    expect(testData.gammaPosCalc(testData.array2dRotated[ 1 ])).toEqual('0')
    expect(testData.gammaPosCalc(testData.array2dRotated[ 2 ])).toEqual('1')
    expect(testData.gammaPosCalc(testData.array2dRotated[ 3 ])).toEqual('1')
    expect(testData.gammaPosCalc(testData.array2dRotated[ 4 ])).toEqual('0')
  })
  test('epsilonPosCalc works', () => {
    expect(testData.epsilonPosCalc(testData.array2dRotated[ 0 ])).toEqual('0')
    expect(testData.epsilonPosCalc(testData.array2dRotated[ 1 ])).toEqual('1')
    expect(testData.epsilonPosCalc(testData.array2dRotated[ 2 ])).toEqual('0')
    expect(testData.epsilonPosCalc(testData.array2dRotated[ 3 ])).toEqual('0')
    expect(testData.epsilonPosCalc(testData.array2dRotated[ 4 ])).toEqual('1')
  })
  test('gammaRateString is 10110', () => {
    expect(testData.gammaRateString).toEqual('10110')
  })
  test('Calculates correct gamma rate', () => {
    expect(testData.gammaRate).toEqual(22)
  })
  test('epsilonRateString is 01001', () => {
    expect(testData.epsilonRateString).toEqual('01001')
  })
  test('Calculates correct epsilon rate', () => {
    expect(testData.epsilonRate).toEqual(9)
  })
  test('Calculates correct power consumption', () => {
    expect(testData.powerConsumption).toEqual(198)
  })
})

describe('part 2', () => {
  const testData = new solution.Data('tests/03.txt')
  test('Can determine oxygen bit criteria', () => {
    expect(testData.getOxygenBitCriteria([ 0, 1, 1, 1, 0 ])).toEqual(1)
    expect(testData.getOxygenBitCriteria([ 0, 1, 1, 0, 0 ])).toEqual(0)
    expect(testData.getOxygenBitCriteria([ 0, 1, 1, 0, 0, 1 ])).toEqual(1)
  })
  test('Can determine CO2 scrubber bit criteria', () => {
    expect(testData.getScrubberBitCriteria([ 0, 1, 1, 0, 0 ])).toEqual(1)
    expect(testData.getScrubberBitCriteria([ 0, 1, 1, 1, 0 ])).toEqual(0)
    expect(testData.getScrubberBitCriteria([ 0, 1, 1, 0, 0, 1 ])).toEqual(0)
  })
  test('Can filter by bit criteria', () => {
    expect(testData.filterByCriteria(testData.array2d, 1, 3)).toEqual([
      [ 1, 1, 1, 1, 0 ],
      [ 1, 0, 1, 1, 0 ],
      [ 1, 0, 1, 1, 1 ],
      [ 0, 1, 1, 1, 1 ],
      [ 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 1, 0 ],
      [ 0, 1, 0, 1, 0 ]
    ])
  })
  test('Can find correct Oxygen Generator Rating string', () => {
    expect(testData.oxygenRatingString).toEqual('10111')
  })
  test('Can find correct CO2 Scrubber Rating string', () => {
    expect(testData.scrubberRatingString).toEqual('01010')
  })
  test('Generates correct oxygen generator rating', () => {
    expect(testData.oxygenRating).toEqual(23)
  })
  test('Generates correct CO2 scrubber rating', () => {
    expect(testData.scrubberRating).toEqual(10)
  })
  test('Generates correct Life Support rating', () => {
    expect(testData.lifeSupportRating).toEqual(230)
  })
})
