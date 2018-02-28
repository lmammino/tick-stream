const { Readable } = require('readable-stream')
const TickStream = require('../index')

class NumbersStream extends Readable {
  constructor (options = {}) {
    super(options)
    this.max = options.max || 2
    this.delay = options.dalay || 50
    this.current = 0
  }

  _read () {
    if (this.current > this.max) {
      return this.push(null)
    }

    setTimeout(() => {
      this.push(String(this.current++))
    }, this.delay)
  }
}

class ObjectsStream extends Readable {
  constructor (options = { objectMode: true }) {
    super(options)
    this.max = options.max || 2
    this.delay = options.dalay || 50
    this.current = 0
  }

  _read () {
    if (this.current > this.max) {
      return this.push(null)
    }

    setTimeout(() => {
      this.push({ i: this.current++ })
    }, this.delay)
  }
}

test('It should log stuff while processing', (endTest) => {
  const logMock = jest.fn()
  global.console.log = logMock

  const expectedLogs = [
    [ 'tick: 0' ], [ 'tick: 1' ], [ 'tick: 2' ]
  ]

  const nStream = new NumbersStream()

  nStream
    .pipe(new TickStream())
    .on('finish', () => {
      expect(logMock.mock.calls).toEqual(expectedLogs)
      endTest()
    })
})

test('It should support object streams', (endTest) => {
  const logMock = jest.fn()
  global.console.log = logMock

  const expectedLogs = [
    [ 'tick: 0' ], [ 'tick: 1' ], [ 'tick: 2' ]
  ]

  const oStream = new ObjectsStream()

  oStream
    .pipe(new TickStream({ objectMode: true }))
    .on('finish', () => {
      expect(logMock.mock.calls).toEqual(expectedLogs)
      endTest()
    })
})

test('It can use a custom logging function', (endTest) => {
  const logMock = jest.fn()
  global.console.log = logMock

  const expectedLogs = [
    [ 'Hello 0' ], [ 'Hello 1' ], [ 'Hello 2' ]
  ]

  const nStream = new NumbersStream()

  nStream
    .pipe(new TickStream({ logFunction: (chunk, encoding, tick) => (console.log(`Hello ${tick}`)) }))
    .on('finish', () => {
      expect(logMock.mock.calls).toEqual(expectedLogs)
      endTest()
    })
})
