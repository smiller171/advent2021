import Data from '../dataimport'

describe('data import', () => {
  const testData = new Data('tests/03.txt')
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
})
