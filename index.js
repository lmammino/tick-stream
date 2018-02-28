const { Transform } = require('readable-stream')

class TickStream extends Transform {
  constructor (options = {}) {
    super(options)
    this.logFunction = options.logFunction ||
      ((data, encoding, tick) => console.log(`tick: ${tick}`))
    this.tick = 0
  }

  _transform (data, encoding, callback) {
    this.logFunction(data, encoding, this.tick)
    this.tick += 1
    this.push(data)
    return callback()
  }
}

module.exports = TickStream
